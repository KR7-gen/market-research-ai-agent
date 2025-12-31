"use client";

import { useState } from "react";
import Header from "../../components/Header";

interface Chapter {
  id: number;
  title: string;
  requiredPoints: string[];
  requiredMetrics: string[];
  recommendedSources: string[];
}

// ダミーデータ
const DEFAULT_TEMPLATE: Chapter[] = [
  {
    id: 1,
    title: "エグゼクティブサマリ",
    requiredPoints: ["市場規模概要", "主要発見", "推奨事項"],
    requiredMetrics: [],
    recommendedSources: ["内部資料", "Web"],
  },
  {
    id: 2,
    title: "市場概要と定義",
    requiredPoints: ["市場定義", "対象範囲", "関連用語"],
    requiredMetrics: [],
    recommendedSources: ["Web", "内部資料"],
  },
  {
    id: 3,
    title: "市場規模と成長率",
    requiredPoints: ["現在の市場規模", "成長予測", "成長ドライバー"],
    requiredMetrics: ["市場規模（金額）", "CAGR", "成長率"],
    recommendedSources: ["内部資料", "Web", "YouTube"],
  },
  {
    id: 4,
    title: "競合分析",
    requiredPoints: ["主要プレイヤー", "市場シェア", "競合の強み/弱み"],
    requiredMetrics: ["市場シェア", "売上高", "顧客数"],
    recommendedSources: ["Web", "YouTube", "内部資料"],
  },
  {
    id: 5,
    title: "参入障壁と機会",
    requiredPoints: ["参入障壁", "参入機会", "成功要因"],
    requiredMetrics: [],
    recommendedSources: ["内部資料", "YouTube"],
  },
  {
    id: 6,
    title: "価格動向と収益性",
    requiredPoints: ["価格帯分析", "収益モデル", "利益率"],
    requiredMetrics: ["平均単価", "粗利率", "営業利益率"],
    recommendedSources: ["内部資料", "Web"],
  },
  {
    id: 7,
    title: "顧客セグメントとニーズ",
    requiredPoints: ["顧客セグメント", "顧客ニーズ", "購買行動"],
    requiredMetrics: ["顧客数", "LTV", "解約率"],
    recommendedSources: ["YouTube", "Web"],
  },
  {
    id: 8,
    title: "リスクと推奨事項",
    requiredPoints: ["主要リスク", "推奨戦略", "実行計画"],
    requiredMetrics: [],
    recommendedSources: ["内部資料"],
  },
];

export default function TemplatesPage() {
  const [template, setTemplate] = useState<Chapter[]>(DEFAULT_TEMPLATE);
  const [editingChapter, setEditingChapter] = useState<number | null>(null);

  const handleSave = () => {
    console.log("テンプレートを保存:", template);
    alert("テンプレートを保存しました（デモ）");
  };

  const handleReset = () => {
    if (confirm("デフォルトのテンプレートに戻しますか？")) {
      setTemplate(DEFAULT_TEMPLATE);
    }
  };

  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: template.length + 1,
      title: "新しい章",
      requiredPoints: [],
      requiredMetrics: [],
      recommendedSources: [],
    };
    setTemplate([...template, newChapter]);
  };

  const handleDeleteChapter = (id: number) => {
    if (confirm("この章を削除しますか？")) {
      setTemplate(template.filter((ch) => ch.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">テンプレ管理</h1>
            <p className="mt-1 text-sm text-gray-600">
              市場調査レポートの章立て・観点・必須指標を設定
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              デフォルトに戻す
            </button>
            <button
              onClick={handleAddChapter}
              className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200"
            >
              + 章を追加
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            市場調査テンプレート（標準8章構成）
          </h2>

          <div className="space-y-4">
            {template.map((chapter, index) => (
              <div key={chapter.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">第{index + 1}章</span>
                      {editingChapter === chapter.id ? (
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => {
                            const newTemplate = [...template];
                            const idx = newTemplate.findIndex((ch) => ch.id === chapter.id);
                            newTemplate[idx].title = e.target.value;
                            setTemplate(newTemplate);
                          }}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      ) : (
                        <h3 className="text-base font-semibold text-gray-900">{chapter.title}</h3>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() =>
                        setEditingChapter(editingChapter === chapter.id ? null : chapter.id)
                      }
                      className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                    >
                      {editingChapter === chapter.id ? "完了" : "編集"}
                    </button>
                    <button
                      onClick={() => handleDeleteChapter(chapter.id)}
                      className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                    >
                      削除
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      必須観点
                    </label>
                    <div className="space-y-1">
                      {chapter.requiredPoints.map((point, i) => (
                        <div key={i} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {point}
                        </div>
                      ))}
                      {chapter.requiredPoints.length === 0 && (
                        <div className="text-xs text-gray-400 italic">未設定</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      必須指標
                    </label>
                    <div className="space-y-1">
                      {chapter.requiredMetrics.map((metric, i) => (
                        <div key={i} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {metric}
                        </div>
                      ))}
                      {chapter.requiredMetrics.length === 0 && (
                        <div className="text-xs text-gray-400 italic">未設定</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      推奨ソース
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {chapter.recommendedSources.map((source, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                        >
                          {source}
                        </span>
                      ))}
                      {chapter.recommendedSources.length === 0 && (
                        <div className="text-xs text-gray-400 italic">未設定</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  テンプレートは全ての新規レポート生成に適用されます。既存のレポートには影響しません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
