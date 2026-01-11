import { Queue } from "bullmq";
import Redis from "ioredis";

// Redis接続の設定
const redisConnection = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

// BullMQ Queueの生成
export const reportGenerationQueue = new Queue("report-generation", {
  connection: redisConnection,
});

// ジョブデータの型定義
export interface ReportGenerationJobData {
  reportId: string;
  jobId: string;
}


