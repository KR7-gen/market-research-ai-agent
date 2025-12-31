"use client";

import Link from "next/link";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";

// ダミーデータ
const DUMMY_REPORTS = [
  {
    id: 1,
    title: "SaaS型人事管理システムの日本市場調査",
    createdAt: "2025-01-15 14:30",
    status: "completed" as const,
    sources: { internal: 3, youtube: 5, web: 12 },
  },
  {
    id: 2,
    title: "飲食店向けモバイルオーダーシステム市場分析",
    createdAt: "2025-01-14 10:15",
    status: "running" as const,
    sources: { internal: 2, youtube: 3, web: 8 },
  },
  {
    id: 3,
    title: "D2C化粧品ブランドの参入可能性調査",
    createdAt: "2025-01-13 16:45",
    status: "failed" as const,
    sources: { internal: 1, youtube: 0, web: 5 },
  },
  {
    id: 4,
    title: "医療機器輸入販売の規制環境調査",
    createdAt: "2025-01-12 09:20",
    status: "completed" as const,
    sources: { internal: 5, youtube: 2, web: 15 },
  },
  {
    id: 5,
    title: "スマート物流サービスの市場規模予測",
    createdAt: "2025-01-11 13:00",
    status: "pending" as const,
    sources: { internal: 0, youtube: 0, web: 0 },
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">レポート一覧</h1>
            <p className="mt-1 text-sm text-gray-600">
              作成したレポートを確認・管理できます
            </p>
          </div>
          <Link
            href="/reports/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新規作成
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {DUMMY_REPORTS.map((report) => (
              <li key={report.id}>
                <Link
                  href={
                    report.status === "completed"
                      ? `/reports/${report.id}`
                      : report.status === "running"
                      ? `/reports/${report.id}/progress`
                      : report.status === "failed"
                      ? `/reports/${report.id}/progress`
                      : `/reports/${report.id}/progress`
                  }
                  className="block hover:bg-gray-50 transition"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {report.title}
                          </h3>
                          <StatusBadge status={report.status} />
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {report.createdAt}
                        </div>
                      </div>

                      <div className="ml-4 flex items-center space-x-6">
                        <div className="text-sm text-gray-500">
                          <div className="font-medium text-gray-700 mb-1">根拠ソース構成</div>
                          <div className="flex space-x-4">
                            <span className="inline-flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                              内部: {report.sources.internal}
                            </span>
                            <span className="inline-flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                              YouTube: {report.sources.youtube}
                            </span>
                            <span className="inline-flex items-center">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              Web: {report.sources.web}
                            </span>
                          </div>
                        </div>

                        {report.status === "failed" && (
                          <Link
                            href={`/reports/${report.id}/progress`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                          >
                            再開
                          </Link>
                        )}

                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {DUMMY_REPORTS.length === 0 && (
          <div className="bg-white shadow sm:rounded-md p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">レポートがありません</h3>
            <p className="mt-1 text-sm text-gray-500">
              新規レポートを作成して始めましょう
            </p>
            <div className="mt-6">
              <Link
                href="/reports/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新規作成
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
