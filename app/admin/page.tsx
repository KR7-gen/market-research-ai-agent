"use client";

import Link from "next/link";
import Header from "../components/Header";

// ダミーデータ
const STATS = {
  todayGenerations: 24,
  failureRate: 8.3,
  averageTime: "18分",
  youtubeFailureRate: 12.5,
  webExtractionFailureRate: 5.2,
};

const PROBLEM_JOBS = [
  {
    id: 1,
    reportTitle: "物流DXソリューション市場調査",
    status: "failed",
    failureReason: "YouTube字幕取得失敗（3章で連続エラー）",
    createdAt: "2025-01-15 15:30",
  },
  {
    id: 2,
    reportTitle: "ヘルスケアIoT市場分析",
    status: "timeout",
    failureReason: "タイムアウト（45分経過）",
    createdAt: "2025-01-15 14:15",
  },
  {
    id: 3,
    reportTitle: "教育テック市場参入調査",
    status: "failed",
    failureReason: "API rate limit到達",
    createdAt: "2025-01-15 13:00",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">管理ダッシュボード</h1>
          <p className="mt-1 text-sm text-gray-600">システム全体の稼働状況と品質指標</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">本日の生成数</p>
                <p className="text-2xl font-bold text-gray-900">{STATS.todayGenerations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">失敗率</p>
                <p className="text-2xl font-bold text-gray-900">{STATS.failureRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均生成時間</p>
                <p className="text-2xl font-bold text-gray-900">{STATS.averageTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">YouTube失敗率</p>
                <p className="text-2xl font-bold text-gray-900">{STATS.youtubeFailureRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Web抽出失敗率</p>
                <p className="text-2xl font-bold text-gray-900">{STATS.webExtractionFailureRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 問題のあるジョブ */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">問題のあるジョブ</h2>
            <Link
              href="/admin/jobs"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              すべて見る →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {PROBLEM_JOBS.map((job) => (
              <div key={job.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{job.reportTitle}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.createdAt}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        {job.status === "failed" ? "失敗" : "タイムアウト"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-red-600">{job.failureReason}</p>
                  </div>
                  <Link
                    href={`/admin/jobs/${job.id}`}
                    className="ml-4 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                  >
                    詳細
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* クイックアクション */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/admin/documents"
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-900">内部資料管理</h3>
            </div>
            <p className="text-xs text-gray-600">RAG用の資料をアップロード・管理</p>
          </Link>

          <Link
            href="/admin/templates"
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-900">テンプレ管理</h3>
            </div>
            <p className="text-xs text-gray-600">章立てと観点のテンプレート編集</p>
          </Link>

          <Link
            href="/admin/quality-rules"
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2">
                <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-900">品質ルール</h3>
            </div>
            <p className="text-xs text-gray-600">品質チェックのしきい値設定</p>
          </Link>

          <Link
            href="/admin/jobs"
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-900">ジョブ監視</h3>
            </div>
            <p className="text-xs text-gray-600">実行中・失敗ジョブの監視と再実行</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
