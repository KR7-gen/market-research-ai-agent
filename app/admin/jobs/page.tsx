"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import StatusBadge from "../../components/StatusBadge";

interface Job {
  id: number;
  reportTitle: string;
  status: "running" | "pending" | "completed" | "failed";
  failureReason?: string;
  createdAt: string;
  completedAt?: string;
  progress: number;
  currentPhase: string;
}

// ダミーデータ
const DUMMY_JOBS: Job[] = [
  {
    id: 1,
    reportTitle: "AIチャットボット市場調査",
    status: "running",
    createdAt: "2025-01-15 16:00",
    progress: 62,
    currentPhase: "執筆中（第5章）",
  },
  {
    id: 2,
    reportTitle: "サステナブル素材市場分析",
    status: "running",
    createdAt: "2025-01-15 15:45",
    progress: 38,
    currentPhase: "根拠収集中（第3章）",
  },
  {
    id: 3,
    reportTitle: "物流DXソリューション市場調査",
    status: "failed",
    failureReason: "YouTube字幕取得失敗（3章で連続エラー）",
    createdAt: "2025-01-15 15:30",
    progress: 35,
    currentPhase: "根拠収集（失敗）",
  },
  {
    id: 4,
    reportTitle: "ヘルスケアIoT市場分析",
    status: "failed",
    failureReason: "タイムアウト（45分経過）",
    createdAt: "2025-01-15 14:15",
    progress: 0,
    currentPhase: "タイムアウト",
  },
  {
    id: 5,
    reportTitle: "教育テック市場参入調査",
    status: "failed",
    failureReason: "API rate limit到達",
    createdAt: "2025-01-15 13:00",
    progress: 12,
    currentPhase: "根拠収集（API制限）",
  },
  {
    id: 6,
    reportTitle: "スマート農業市場調査",
    status: "completed",
    createdAt: "2025-01-15 11:30",
    completedAt: "2025-01-15 11:52",
    progress: 100,
    currentPhase: "完了",
  },
  {
    id: 7,
    reportTitle: "金融DX市場分析",
    status: "completed",
    createdAt: "2025-01-15 10:00",
    completedAt: "2025-01-15 10:18",
    progress: 100,
    currentPhase: "完了",
  },
  {
    id: 8,
    reportTitle: "不動産テック市場調査",
    status: "pending",
    createdAt: "2025-01-15 16:15",
    progress: 0,
    currentPhase: "待機中",
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(DUMMY_JOBS);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleRetry = (jobId: number) => {
    console.log("ジョブ再実行:", jobId);
    alert(`ジョブID ${jobId} を再実行します（デモ）`);
  };

  const handleCancel = (jobId: number) => {
    if (confirm("このジョブをキャンセルしますか？")) {
      console.log("ジョブキャンセル:", jobId);
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterStatus === "all") return true;
    return job.status === filterStatus;
  });

  const stats = {
    running: jobs.filter((j) => j.status === "running").length,
    pending: jobs.filter((j) => j.status === "pending").length,
    failed: jobs.filter((j) => j.status === "failed").length,
    completed: jobs.filter((j) => j.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">ジョブ監視</h1>
          <p className="mt-1 text-sm text-gray-600">
            レポート生成ジョブの監視と管理
          </p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">実行中</p>
                <p className="text-2xl font-bold text-blue-600">{stats.running}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">待機中</p>
                <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">失敗</p>
                <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">完了</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* フィルタ */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">フィルタ:</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 text-sm rounded-md ${
                  filterStatus === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                すべて
              </button>
              <button
                onClick={() => setFilterStatus("running")}
                className={`px-4 py-2 text-sm rounded-md ${
                  filterStatus === "running"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                実行中
              </button>
              <button
                onClick={() => setFilterStatus("failed")}
                className={`px-4 py-2 text-sm rounded-md ${
                  filterStatus === "failed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                失敗
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2 text-sm rounded-md ${
                  filterStatus === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                待機中
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-4 py-2 text-sm rounded-md ${
                  filterStatus === "completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                完了
              </button>
            </div>
          </div>
        </div>

        {/* ジョブ一覧 */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ジョブID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  レポートタイトル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  進捗
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作成日時
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{job.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.reportTitle}</div>
                      <div className="text-xs text-gray-500">{job.currentPhase}</div>
                      {job.failureReason && (
                        <div className="text-xs text-red-600 mt-1">{job.failureReason}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ width: "100px" }}>
                        <div
                          className={`h-2 rounded-full ${
                            job.status === "completed"
                              ? "bg-green-600"
                              : job.status === "failed"
                              ? "bg-red-600"
                              : job.status === "running"
                              ? "bg-blue-600"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{job.createdAt}</div>
                    {job.completedAt && (
                      <div className="text-xs text-gray-400">完了: {job.completedAt}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {job.status === "failed" && (
                      <button
                        onClick={() => handleRetry(job.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        再実行
                      </button>
                    )}
                    {(job.status === "running" || job.status === "pending") && (
                      <button
                        onClick={() => handleCancel(job.id)}
                        className="text-red-600 hover:text-red-900 mr-3"
                      >
                        キャンセル
                      </button>
                    )}
                    <Link
                      href={`/reports/${job.id}/progress`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="bg-white shadow sm:rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">該当するジョブがありません</h3>
          </div>
        )}
      </div>
    </div>
  );
}
