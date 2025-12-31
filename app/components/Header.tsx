"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={isAdminPage ? "/admin" : "/"} className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                {isAdminPage ? "管理画面" : "市場調査AI"}
              </span>
            </Link>
          </div>

          <nav className="flex space-x-4">
            {!isAdminPage ? (
              <>
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ホーム
                </Link>
                <Link
                  href="/reports"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname?.startsWith("/reports") ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  レポート一覧
                </Link>
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  管理
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/admin" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ダッシュボード
                </Link>
                <Link
                  href="/admin/documents"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/admin/documents" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  内部資料
                </Link>
                <Link
                  href="/admin/templates"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/admin/templates" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  テンプレ
                </Link>
                <Link
                  href="/admin/quality-rules"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/admin/quality-rules" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  品質ルール
                </Link>
                <Link
                  href="/admin/jobs"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/admin/jobs" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ジョブ監視
                </Link>
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  ユーザー画面へ
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
