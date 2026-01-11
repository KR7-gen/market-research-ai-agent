import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { reportGenerationQueue, ReportGenerationJobData } from "@/app/lib/queue";
import { logEvent } from "@/app/lib/status";

// 同時実行制限（仮ユーザー固定のため、全体で制限）
const MAX_CONCURRENT_JOBS = 5;

export async function POST(request: NextRequest) {
  console.log("[API] POST /api/reports が呼び出されました");
  try {
    const body = await request.json();
    console.log("[API] リクエストボディ:", body);
    const {
      theme_text,
      purpose,
      region,
      period,
      assumptions,
      focus_points,
      source_priority,
    } = body;

    // 必須パラメータチェック
    if (!theme_text || typeof theme_text !== "string") {
      console.log("[API] バリデーションエラー: theme_text is required");
      return NextResponse.json(
        { error: "theme_text is required" },
        { status: 400 }
      );
    }

    // 同時実行制限チェック（仮ユーザー固定）
    const userId = "dummy-user";
    const runningJobsCount = await prisma.job.count({
      where: {
        report: {
          userId,
        },
        status: "running",
      },
    });

    if (runningJobsCount >= MAX_CONCURRENT_JOBS) {
      return NextResponse.json(
        { error: "Too many concurrent jobs. Please try again later." },
        { status: 429 }
      );
    }

    // トランザクションでレポート、入力、ジョブを作成
    console.log("[API] DBトランザクションを開始します...");
    const result = await prisma.$transaction(async (tx) => {
      // レポート作成
      console.log("[API] レポートレコードを作成します...");
      const report = await tx.report.create({
        data: {
          status: "queued",
          userId,
        },
      });
      console.log("[API] レポート作成完了:", { reportId: report.id });

      // レポート入力作成
      console.log("[API] レポート入力レコードを作成します...");
      await tx.reportInput.create({
        data: {
          reportId: report.id,
          themeText: theme_text,
          purpose: purpose || null,
          region: region || null,
          period: period || null,
          assumptions: assumptions || null,
          focusPoints: focus_points || null,
          sourcePriority: source_priority || null,
        },
      });
      console.log("[API] レポート入力作成完了");

      // ジョブ作成
      console.log("[API] ジョブレコードを作成します...");
      const job = await tx.job.create({
        data: {
          reportId: report.id,
          status: "queued",
          attempts: 0,
        },
      });
      console.log("[API] ジョブ作成完了:", { jobId: job.id });

      return { report, job };
    });
    console.log("[API] DBトランザクション完了:", {
      reportId: result.report.id,
      jobId: result.job.id,
    });

    // ジョブイベントに「受付」を記録
    await logEvent(
      result.report.id,
      result.job.id,
      "info",
      "ジョブを受け付けました"
    );

    // BullMQにジョブをエンキュー
    console.log("[API] BullMQにジョブをエンキューします...", {
      reportId: result.report.id,
      jobId: result.job.id,
    });
    await reportGenerationQueue.add(
      "generate-report",
      {
        reportId: result.report.id,
        jobId: result.job.id,
      } as ReportGenerationJobData,
      {
        jobId: result.job.id, // ジョブIDをBullMQのジョブIDとして使用
      }
    );
    console.log("[API] BullMQへのジョブ投入が完了しました");

    console.log("[API] レスポンスを返します:", { reportId: result.report.id });
    return NextResponse.json(
      { reportId: result.report.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


