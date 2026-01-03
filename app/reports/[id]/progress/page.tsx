"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../../components/Header";
import StatusBadge from "../../../components/StatusBadge";

type ChapterStatus = "pending" | "designing" | "gathering" | "writing" | "reviewing" | "completed" | "failed" | "insufficient_evidence";

interface Chapter {
  id: number;
  title: string;
  status: ChapterStatus;
  evidenceSources: {
    internal: number;
    youtube: number;
    web: number;
  };
}

// ダミーデータ
const DUMMY_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "エグゼクティブサマリ",
    status: "completed",
    evidenceSources: { internal: 2, youtube: 1, web: 3 },
  },
  {
    id: 2,
    title: "市場概要と定義",
    status: "completed",
    evidenceSources: { internal: 3, youtube: 2, web: 5 },
  },
  {
    id: 3,
    title: "市場規模と成長率",
    status: "reviewing",
    evidenceSources: { internal: 1, youtube: 3, web: 4 },
  },
  {
    id: 4,
    title: "競合分析",
    status: "writing",
    evidenceSources: { internal: 0, youtube: 2, web: 6 },
  },
  {
    id: 5,
    title: "参入障壁と機会",
    status: "gathering",
    evidenceSources: { internal: 1, youtube: 0, web: 2 },
  },
  {
    id: 6,
    title: "価格動向と収益性",
    status: "designing",
    evidenceSources: { internal: 0, youtube: 0, web: 0 },
  },
  {
    id: 7,
    title: "顧客セグメントとニーズ",
    status: "pending",
    evidenceSources: { internal: 0, youtube: 0, web: 0 },
  },
  {
    id: 8,
    title: "リスクと推奨事項",
    status: "pending",
    evidenceSources: { internal: 0, youtube: 0, web: 0 },
  },
];

const DUMMY_LOGS = [
  { id: 1, time: "14:32:15", message: "レポート生成を開始しました", type: "info" },
  { id: 2, time: "14:32:18", message: "骨格設計フェーズ: 8章構成を決定", type: "info" },
  { id: 3, time: "14:32:45", message: "第1章「エグゼクティブサマリ」の根拠収集を開始", type: "info" },
  { id: 4, time: "14:33:12", message: "内部資料から2件の根拠を取得", type: "success" },
  { id: 5, time: "14:33:28", message: "YouTube動画「SaaS市場分析2024」から字幕を取得", type: "success" },
  { id: 6, time: "14:34:05", message: "第3章の根拠収集中: YouTube字幕取得に失敗 → 別の動画を探索中", type: "warning" },
  { id: 7, time: "14:34:22", message: "代替YouTube動画を発見: 字幕取得成功", type: "success" },
  { id: 8, time: "14:35:10", message: "第4章の執筆を開始（AIによる文章生成中）", type: "info" },
];

const statusLabels: Record<ChapterStatus, string> = {
  pending: "待機中",
  designing: "設計中",
  gathering: "根拠収集中",
  writing: "執筆中",
  reviewing: "レビュー中",
  completed: "完了",
  failed: "失敗",
  insufficient_evidence: "根拠不足",
};

export default function ProgressPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id;

  const [currentPhase] = useState("執筆");
  const [estimatedTime] = useState("約15分");
  const [completedChapters] = useState(2);
  const totalChapters = DUMMY_CHAPTERS.length;
  const progressPercentage = Math.round((completedChapters / totalChapters) * 100);

  const handleRegenerateChapter = (chapterId: number) => {
    console.log("章の再生成:", chapterId);
    alert(`第${chapterId}章を再生成します（デモ）`);
  };

  const handleAddEvidence = (chapterId: number) => {
    console.log("根拠追加:", chapterId);
    alert(`第${chapterId}章に根拠を追加します（デモ）`);
  };

  const handleSkipChapter = (chapterId: number) => {
    console.log("章をスキップ:", chapterId);
    alert(`第${chapterId}章をスキップします（デモ）`);
  };

  const handleRegenerateAll = () => {
    console.log("全体を再生成");
    alert("全体を再生成します（デモ）");
  };

  const handleStop = () => {
    console.log("実行を中断");
    if (confirm("実行を中断しますか？途中成果は保持されます。")) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 全体進捗 */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">レポート生成中</h1>
            <div className="flex space-x-3">
              <button
                onClick={handleRegenerateAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                全体を再生成
              </button>
              <button
                onClick={handleStop}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                中断
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">現在のフェーズ</div>
              <div className="text-xl font-semibold text-blue-600">{currentPhase}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">進捗状況</div>
              <div className="text-xl font-semibold text-gray-900">
                {completedChapters} / {totalChapters} 章完了
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">推定残り時間</div>
              <div className="text-xl font-semibold text-gray-900">{estimatedTime}</div>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs font-semibold inline-block text-blue-600">
                {progressPercentage}%
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 章リスト */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">章別進捗</h2>
              <div className="space-y-4">
                {DUMMY_CHAPTERS.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-medium text-gray-500">第{chapter.id}章</span>
                          <h3 className="text-base font-semibold text-gray-900">{chapter.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-600">{statusLabels[chapter.status]}</span>
                          {chapter.status === "gathering" && (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 text-xs text-gray-600">
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                          内部: {chapter.evidenceSources.internal}
                        </span>
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                          YouTube: {chapter.evidenceSources.youtube}
                        </span>
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          Web: {chapter.evidenceSources.web}
                        </span>
                      </div>

                      {(chapter.status === "failed" || chapter.status === "insufficient_evidence") && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleRegenerateChapter(chapter.id)}
                            className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                          >
                            再生成
                          </button>
                          <button
                            onClick={() => handleAddEvidence(chapter.id)}
                            className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                          >
                            根拠追加
                          </button>
                          <button
                            onClick={() => handleSkipChapter(chapter.id)}
                            className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            スキップ
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ログ */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">実行ログ</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {DUMMY_LOGS.map((log) => (
                  <div
                    key={log.id}
                    className={`text-xs p-2 rounded ${
                      log.type === "success"
                        ? "bg-green-50 text-green-800"
                        : log.type === "warning"
                        ? "bg-yellow-50 text-yellow-800"
                        : log.type === "error"
                        ? "bg-red-50 text-red-800"
                        : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div className="font-mono text-gray-500">{log.time}</div>
                    <div>{log.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
