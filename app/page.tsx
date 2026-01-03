"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "./components/Header";
import StatusBadge from "./components/StatusBadge";

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

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // 認証状態をチェック
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  // 認証状態が確認されるまで何も表示しない
  if (isAuthenticated === null) {
    return null;
  }

  // 未認証の場合は何も表示しない（リダイレクト中）
  if (!isAuthenticated) {
    return null;
  }
  
  // 以下はログイン後の表示内容（認証実装後は到達可能になる）
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Deep Research型
            <br />
            <span className="text-blue-600">市場調査レポート生成ツール</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            根拠付きで、読みやすく整理された市場調査レポートを自動生成します。
            <br />
            Web・YouTube・内部資料から多角的に情報を収集し、信頼性の高いレポートを作成します。
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/reports/new"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              新規レポート作成
            </Link>
          </div>
        </div>

        {/* レポート一覧セクション */}
        <div className="mt-16">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">レポート一覧</h2>
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

          {DUMMY_REPORTS.length > 0 ? (
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
          ) : (
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

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">骨格から設計</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  検索前に完成形を設計し、散らばった情報のまとめを防ぎます
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">多元的な根拠</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Web・YouTube・内部資料から根拠を収集し、信頼性を確保します
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">章単位で保存</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  失敗しても完了章は保存され、失敗章だけ再実行できます
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">主な機能</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>市場規模、成長率、競合、参入障壁などを網羅した8章構成のレポート</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>各主張に根拠が紐付き、どの情報源から引用したか追跡可能</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>引用数チェック、断定語チェックなどの品質管理機能</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>リアルタイムで進捗を確認し、章単位で再実行が可能</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
