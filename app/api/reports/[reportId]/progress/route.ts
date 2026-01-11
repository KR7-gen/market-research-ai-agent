import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    const { reportId } = params;

    // レポート情報を取得
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        inputs: true,
        sections: {
          orderBy: { orderNo: "asc" },
          select: {
            id: true,
            orderNo: true,
            title: true,
            status: true,
          },
        },
        jobs: {
          orderBy: { createdAt: "desc" },
          take: 1, // 最新のジョブ
          select: {
            id: true,
            status: true,
            attempts: true,
            createdAt: true,
            startedAt: true,
            completedAt: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // 最新のジョブのイベントを取得（直近50件）
    const latestJob = report.jobs[0];
    const jobEvents = latestJob
      ? await prisma.jobEvent.findMany({
          where: { jobId: latestJob.id },
          orderBy: { createdAt: "desc" },
          take: 50,
          select: {
            id: true,
            eventType: true,
            messageUser: true,
            messageInternal: true,
            createdAt: true,
          },
        })
      : [];

    // UI向けに整形
    const response = {
      report: {
        id: report.id,
        status: report.status,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
        completedAt: report.completedAt,
      },
      input: report.inputs[0] || null,
      sections: report.sections,
      job: latestJob || null,
      events: jobEvents.reverse(), // 時系列順に並び替え
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching report progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


