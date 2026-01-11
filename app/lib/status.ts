import { prisma } from "./db";

// イベントタイプ
export type EventType = "info" | "error" | "progress";

// ステータス更新とログ記録の共通ユーティリティ

/**
 * ジョブイベントを記録
 */
export async function logEvent(
  reportId: string,
  jobId: string,
  eventType: EventType,
  messageUser: string,
  messageInternal?: string
): Promise<void> {
  await prisma.jobEvent.create({
    data: {
      jobId,
      reportId,
      eventType,
      messageUser,
      messageInternal,
    },
  });
}

/**
 * レポートのステータスを更新
 */
export async function updateReportStatus(
  reportId: string,
  status: "queued" | "running" | "completed" | "failed"
): Promise<void> {
  const updateData: { status: string; completedAt?: Date } = { status };
  if (status === "completed") {
    updateData.completedAt = new Date();
  }
  await prisma.report.update({
    where: { id: reportId },
    data: updateData,
  });
}

/**
 * ジョブのステータスを更新
 */
export async function updateJobStatus(
  jobId: string,
  status: "queued" | "running" | "completed" | "failed"
): Promise<void> {
  const updateData: {
    status: string;
    startedAt?: Date;
    completedAt?: Date;
  } = { status };

  if (status === "running" && !updateData.startedAt) {
    updateData.startedAt = new Date();
  }
  if (status === "completed" || status === "failed") {
    updateData.completedAt = new Date();
  }

  await prisma.job.update({
    where: { id: jobId },
    data: updateData,
  });
}

/**
 * セクションのステータスを更新
 */
export async function updateSectionStatus(
  sectionId: string,
  status: "planned" | "collecting" | "drafting" | "completed" | "failed"
): Promise<void> {
  await prisma.section.update({
    where: { id: sectionId },
    data: { status },
  });
}


