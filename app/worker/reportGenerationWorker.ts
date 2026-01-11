// 切り分け: DATABASE_URLの読み込み確認
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "OK" : "UNDEFINED");

import { Worker, Job } from "bullmq";
import Redis from "ioredis";
import { prisma } from "../lib/db";
import {
  logEvent,
  updateReportStatus,
  updateJobStatus,
  updateSectionStatus,
} from "../lib/status";
import { ReportGenerationJobData } from "../lib/queue";

// Redis接続の設定
const redisConnection = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

// 8章のタイトル（固定）
const SECTION_TITLES = [
  "市場概要",
  "市場規模と成長率",
  "競合分析",
  "参入障壁",
  "顧客セグメント",
  "技術動向",
  "規制・法規制環境",
  "将来展望",
];

// Workerの作成
const worker = new Worker<ReportGenerationJobData>(
  "report-generation",
  async (job: Job<ReportGenerationJobData>) => {
    const { reportId, jobId } = job.data;

    try {
      console.log("========================================");
      console.log("[Worker] Job received - ジョブを受信しました");
      console.log("[Worker] Job ID:", jobId);
      console.log("[Worker] Report ID:", reportId);
      console.log("[Worker] Job Data:", job.data);
      console.log("========================================");
      console.log(`[Worker] Processing job ${jobId} for report ${reportId}`);

      // ジョブとレポートのステータスをrunningに更新
      await updateJobStatus(jobId, "running");
      await updateReportStatus(reportId, "running");
      await logEvent(reportId, jobId, "info", "処理を開始しました");

      // 8章を作成（status=planned）
      const sections = await Promise.all(
        SECTION_TITLES.map((title, index) =>
          prisma.section.create({
            data: {
              reportId,
              orderNo: index + 1,
              title,
              status: "planned",
            },
          })
        )
      );

      await logEvent(
        reportId,
        jobId,
        "info",
        `8章の構成を作成しました（${sections.length}章）`
      );

      // 各章を順に処理
      for (const section of sections) {
        try {
          // collecting
          await updateSectionStatus(section.id, "collecting");
          await logEvent(
            reportId,
            jobId,
            "progress",
            `第${section.orderNo}章「${section.title}」の情報収集を開始しました`
          );

          // ダミー処理（②以降で実装）
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // drafting
          await updateSectionStatus(section.id, "drafting");
          await logEvent(
            reportId,
            jobId,
            "progress",
            `第${section.orderNo}章「${section.title}」の執筆を開始しました`
          );

          // ダミー処理（②以降で実装）
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // completed
          await updateSectionStatus(section.id, "completed");
          await logEvent(
            reportId,
            jobId,
            "progress",
            `第${section.orderNo}章「${section.title}」が完了しました`
          );
        } catch (sectionError) {
          console.error(
            `[Worker] Error processing section ${section.id}:`,
            sectionError
          );
          await updateSectionStatus(section.id, "failed");
          await logEvent(
            reportId,
            jobId,
            "error",
            `第${section.orderNo}章「${section.title}」の処理中にエラーが発生しました`,
            String(sectionError)
          );
        }
      }

      // 全章完了後、レポートとジョブをcompletedに
      await updateReportStatus(reportId, "completed");
      await updateJobStatus(jobId, "completed");
      await logEvent(reportId, jobId, "info", "レポート生成が完了しました");

      console.log(`[Worker] Completed job ${jobId} for report ${reportId}`);
    } catch (error) {
      console.error(`[Worker] Error processing job ${jobId}:`, error);

      // エラー時はfailedに更新
      try {
        await updateJobStatus(jobId, "failed");
        await updateReportStatus(reportId, "failed");
        await logEvent(
          reportId,
          jobId,
          "error",
          "レポート生成中にエラーが発生しました",
          error instanceof Error ? error.message : String(error)
        );
      } catch (updateError) {
        console.error("[Worker] Error updating status:", updateError);
      }

      throw error; // BullMQにエラーを伝播
    }
  },
  {
    connection: redisConnection,
    concurrency: 1, // 同時実行数を1に制限（必要に応じて変更可能）
  }
);

// Workerイベントハンドラ
worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err);
});

worker.on("error", (err) => {
  console.error("[Worker] Error:", err);
});

// グレースフルシャットダウン
process.on("SIGTERM", async () => {
  console.log("[Worker] SIGTERM received, closing worker...");
  await worker.close();
  await redisConnection.quit();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("[Worker] SIGINT received, closing worker...");
  await worker.close();
  await redisConnection.quit();
  process.exit(0);
});

console.log("[Worker] Report generation worker started");


