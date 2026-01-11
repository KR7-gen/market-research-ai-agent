"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

const PURPOSES = [
  "参入判断",
  "投資判断",
  "競合比較",
  "市場動向調査",
];

const REGIONS = [
  "日本",
  "北米",
  "欧州",
  "アジア太平洋",
  "グローバル",
];

const FOCUS_POINTS = [
  "市場規模",
  "成長率",
  "競合状況",
  "参入障壁",
  "価格動向",
  "顧客セグメント",
  "規制環境",
  "技術トレンド",
];

const SOURCE_TYPES = [
  { id: "internal", label: "内部資料" },
  { id: "youtube", label: "YouTube" },
  { id: "web", label: "Web検索" },
];

export default function NewReportPage() {
  const router = useRouter();
  const [theme, setTheme] = useState("");
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [region, setRegion] = useState("");
  const [period, setPeriod] = useState("");
  const [assumptions, setAssumptions] = useState("");
  const [focusPoints, setFocusPoints] = useState<string[]>([]);
  const [sourcePriority, setSourcePriority] = useState(["internal", "youtube", "web"]);
  const [autoFallback, setAutoFallback] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFocusPointToggle = (point: string) => {
    setFocusPoints((prev) =>
      prev.includes(point)
        ? prev.filter((p) => p !== point)
        : [...prev, point]
    );
  };

  const handleSourcePriorityChange = (index: number, direction: "up" | "down") => {
    const newPriority = [...sourcePriority];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex >= 0 && swapIndex < newPriority.length) {
      [newPriority[index], newPriority[swapIndex]] = [newPriority[swapIndex], newPriority[index]];
      setSourcePriority(newPriority);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit called - ボタンがクリックされました");
    e.preventDefault();
    console.log("preventDefault executed");
    setIsSubmitting(true);
    console.log("isSubmitting set to true");

    try {
      // 1. 通信確認用: /api/health へのGETリクエスト
      console.log("[通信確認] /api/health へのGETリクエストを送信します...");
      const healthResponse = await fetch("/api/health");
      console.log("[通信確認] /api/health レスポンス:", {
        status: healthResponse.status,
        ok: healthResponse.ok,
      });
      const healthData = await healthResponse.json();
      console.log("[通信確認] /api/health データ:", healthData);

      // 2. レポート作成: POST /api/reports
      const reportData = {
        theme_text: theme,
        purpose: customPurpose || purpose || null,
        region: region || null,
        period: period || null,
        assumptions: assumptions || null,
        focus_points: focusPoints.length > 0 ? focusPoints : null,
        source_priority: sourcePriority,
        auto_fallback: autoFallback,
      };

      console.log("[レポート作成] POST /api/reports へのリクエストを送信します...");
      console.log("[レポート作成] リクエストデータ:", reportData);

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      console.log("[レポート作成] レスポンス:", {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[レポート作成] エラーレスポンス:", errorData);
        alert(`レポート作成に失敗しました: ${errorData.error || response.statusText}`);
        setIsSubmitting(false);
        return;
      }

      const result = await response.json();
      console.log("[レポート作成] 成功レスポンス:", result);

      // 成功時は進捗画面に遷移
      if (result.reportId) {
        console.log(`[レポート作成] レポートID: ${result.reportId} で進捗画面に遷移します`);
        router.push(`/reports/${result.reportId}/progress`);
      } else {
        alert("レポート生成を開始しました");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("[レポート作成] エラーが発生しました:", error);
      alert(`エラーが発生しました: ${error instanceof Error ? error.message : String(error)}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">新規レポート作成</h1>
            <p className="mt-1 text-sm text-gray-600">
              調査したいテーマと条件を入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* テーマ（必須） */}
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                テーマ <span className="text-red-500">*</span>
              </label>
              <textarea
                id="theme"
                required
                rows={3}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="例: SaaS型人事管理システムの日本市場調査。3年で年商1億は現実的か？"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>

            {/* 目的（任意） */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                目的（任意）
              </label>
              <select
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              >
                <option value="">選択してください</option>
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
                <option value="custom">その他（カスタム入力）</option>
              </select>
              {purpose === "custom" && (
                <input
                  type="text"
                  value={customPurpose}
                  onChange={(e) => setCustomPurpose(e.target.value)}
                  placeholder="目的を入力してください"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                />
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* 対象地域（任意） */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  対象地域（任意）
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                >
                  <option value="">選択してください</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* 期間（任意） */}
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                  期間（任意）
                </label>
                <input
                  type="text"
                  id="period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="例: 直近3年、将来5年"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                />
              </div>
            </div>

            {/* 前提条件（任意） */}
            <div>
              <label htmlFor="assumptions" className="block text-sm font-medium text-gray-700">
                前提条件（任意）
              </label>
              <textarea
                id="assumptions"
                rows={2}
                value={assumptions}
                onChange={(e) => setAssumptions(e.target.value)}
                placeholder="例: 価格帯10万円以下、オンライン販売のみ"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
              />
            </div>

            {/* 重視観点（任意） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                重視観点（任意・複数選択可）
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {FOCUS_POINTS.map((point) => (
                  <label key={point} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={focusPoints.includes(point)}
                      onChange={() => handleFocusPointToggle(point)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{point}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 根拠ソース優先順 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                根拠ソース優先順
              </label>
              <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                {sourcePriority.map((sourceId, index) => {
                  const source = SOURCE_TYPES.find((s) => s.id === sourceId);
                  return (
                    <div key={sourceId} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">{index + 1}.</span>
                        <span className="text-sm font-medium text-gray-900">{source?.label}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleSourcePriorityChange(index, "up")}
                          disabled={index === 0}
                          className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSourcePriorityChange(index, "down")}
                          disabled={index === sourcePriority.length - 1}
                          className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <label className="flex items-center space-x-2 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoFallback}
                  onChange={(e) => setAutoFallback(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  不足時は自動で次ソースへフォールバック
                </span>
              </label>
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={!theme || isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "生成開始中..." : "生成開始"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
