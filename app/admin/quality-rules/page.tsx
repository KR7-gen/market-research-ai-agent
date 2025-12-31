"use client";

import { useState } from "react";
import Header from "../../components/Header";

interface QualityRules {
  minCitationsPerChapter: number;
  minPrimarySourcesRatio: number;
  forbiddenPhrases: string[];
  minEvidenceQualityScore: number;
  maxChapterLength: number;
  minChapterLength: number;
}

export default function QualityRulesPage() {
  const [rules, setRules] = useState<QualityRules>({
    minCitationsPerChapter: 3,
    minPrimarySourcesRatio: 30,
    forbiddenPhrases: ["絶対に", "確実に", "必ず", "100%"],
    minEvidenceQualityScore: 60,
    maxChapterLength: 2000,
    minChapterLength: 300,
  });

  const [newPhrase, setNewPhrase] = useState("");

  const handleSave = () => {
    console.log("品質ルールを保存:", rules);
    alert("品質ルールを保存しました（デモ）");
  };

  const handleAddPhrase = () => {
    if (newPhrase && !rules.forbiddenPhrases.includes(newPhrase)) {
      setRules({
        ...rules,
        forbiddenPhrases: [...rules.forbiddenPhrases, newPhrase],
      });
      setNewPhrase("");
    }
  };

  const handleRemovePhrase = (phrase: string) => {
    setRules({
      ...rules,
      forbiddenPhrases: rules.forbiddenPhrases.filter((p) => p !== phrase),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">品質ルール管理</h1>
            <p className="mt-1 text-sm text-gray-600">
              レポート生成時の品質チェック基準を設定
            </p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            保存
          </button>
        </div>

        <div className="space-y-6">
          {/* 引用数チェック */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">引用数チェック</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  章あたりの最低引用数
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={rules.minCitationsPerChapter}
                    onChange={(e) =>
                      setRules({ ...rules, minCitationsPerChapter: parseInt(e.target.value) })
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">件以上</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  各章に最低限必要な引用（根拠）の数
                </p>
              </div>
            </div>
          </div>

          {/* 一次情報の定義 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">一次情報の定義</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  一次ソースの最低割合
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={rules.minPrimarySourcesRatio}
                    onChange={(e) =>
                      setRules({ ...rules, minPrimarySourcesRatio: parseInt(e.target.value) })
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">%以上</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  一次情報（公式レポート、統計データ、企業発表など）の最低割合
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-700">
                  <strong>一次ソースの例:</strong> 政府統計、調査会社レポート、企業IR資料、学術論文
                  <br />
                  <strong>二次ソースの例:</strong> ニュース記事、ブログ、一般サイト
                </p>
              </div>
            </div>
          </div>

          {/* 断定語チェック */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">断定語チェック</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  禁止フレーズ
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newPhrase}
                    onChange={(e) => setNewPhrase(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddPhrase();
                      }
                    }}
                    placeholder="フレーズを入力してEnter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddPhrase}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    追加
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {rules.forbiddenPhrases.map((phrase) => (
                    <span
                      key={phrase}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                    >
                      {phrase}
                      <button
                        onClick={() => handleRemovePhrase(phrase)}
                        className="ml-2 hover:text-red-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  これらのフレーズが検出された場合、警告が表示されます
                </p>
              </div>
            </div>
          </div>

          {/* 根拠品質スコア */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">根拠品質スコア</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  最低品質スコア
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={rules.minEvidenceQualityScore}
                    onChange={(e) =>
                      setRules({ ...rules, minEvidenceQualityScore: parseInt(e.target.value) })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-900 w-12">
                    {rules.minEvidenceQualityScore}点
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  根拠の信頼性スコアの最低基準（0-100点）
                </p>

                <div className="mt-3 text-xs text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <span className="w-20">90-100点:</span>
                    <span>政府統計、大手調査会社レポート</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20">70-89点:</span>
                    <span>企業IR、業界団体発表</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20">50-69点:</span>
                    <span>専門メディア、信頼できるニュース</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20">0-49点:</span>
                    <span>一般ブログ、不明な出典</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 章の長さ制限 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">章の長さ制限</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  最低文字数
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={rules.minChapterLength}
                    onChange={(e) =>
                      setRules({ ...rules, minChapterLength: parseInt(e.target.value) })
                    }
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">文字</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  最大文字数
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={rules.maxChapterLength}
                    onChange={(e) =>
                      setRules({ ...rules, maxChapterLength: parseInt(e.target.value) })
                    }
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">文字</span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              各章の適切な長さを保つための制限
            </p>
          </div>

          {/* 注意事項 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  品質ルールの変更は次回のレポート生成から適用されます。既存のレポートには影響しません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
