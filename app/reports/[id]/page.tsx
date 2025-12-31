"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";

interface Evidence {
  id: number;
  type: "web" | "youtube" | "internal";
  title: string;
  url?: string;
  excerpt: string;
  retrievedAt?: string;
}

// ダミーデータ
const DUMMY_REPORT = {
  id: 1,
  title: "SaaS型人事管理システムの日本市場調査",
  createdAt: "2025-01-15 14:30",
  executiveSummary: `本調査では、SaaS型人事管理システムの日本市場について分析を行った。市場規模は2024年時点で約500億円と推定され、年平均成長率（CAGR）は12-15%と予測される。3年で年商1億円達成は、適切な戦略と差別化要素があれば現実的な目標である。

主要な発見事項：
• 市場は成長期にあり、中小企業のDX化需要が拡大中
• 既存大手プレイヤーとの差別化が重要
• クラウド移行の加速により参入障壁は低下傾向
• 顧客獲得コスト（CAC）の最適化が収益性の鍵`,
  chapters: [
    {
      id: 1,
      title: "エグゼクティブサマリ",
      content: "本調査では、SaaS型人事管理システムの日本市場について包括的な分析を実施しました...",
    },
    {
      id: 2,
      title: "市場概要と定義",
      content: `SaaS型人事管理システムとは、クラウド上で提供される人事・労務管理のためのソフトウェアサービスを指します。[1][2]

主な機能には以下が含まれます：
• 勤怠管理
• 給与計算
• 人事評価
• 採用管理
• タレントマネジメント

市場の定義として、本調査では月額課金型のクラウドサービスを対象とし、オンプレミス型は除外しています。[3]`,
    },
    {
      id: 3,
      title: "市場規模と成長率",
      content: `日本のSaaS型人事管理システム市場は、2024年時点で約500億円規模と推定されます。[4][5]

成長予測：
• 2024年: 500億円
• 2025年: 560億円（+12%）
• 2026年: 630億円（+12.5%）
• 2027年: 710億円（+12.7%）

年平均成長率（CAGR）は12-15%と予測され、堅調な成長が見込まれます。[6][7]

成長ドライバー：
• 中小企業のDX化推進
• リモートワーク普及による需要増
• 労働法規制の複雑化
• ペーパーレス化の加速`,
    },
  ],
};

const DUMMY_EVIDENCES: Evidence[] = [
  {
    id: 1,
    type: "web",
    title: "SaaS市場レポート2024 - ITR",
    url: "https://example.com/saas-report-2024",
    excerpt: "SaaS型人事管理システム市場は、中小企業を中心に導入が進んでおり...",
    retrievedAt: "2025-01-15",
  },
  {
    id: 2,
    type: "youtube",
    title: "SaaS業界動向解説 2024年版",
    url: "https://youtube.com/watch?v=example",
    excerpt: "人事管理SaaSは特に成長が著しく、年率15%以上の拡大が見込まれています...",
    retrievedAt: "2025-01-15",
  },
  {
    id: 3,
    type: "internal",
    title: "社内市場調査データ_人事SaaS.pdf",
    excerpt: "当社の調査によると、SaaS型人事システムの市場規模は500億円程度と推定され...",
    retrievedAt: "2025-01-15",
  },
  {
    id: 4,
    type: "web",
    title: "国内HR Tech市場の現状 - MM総研",
    url: "https://example.com/hrtech-market",
    excerpt: "2024年の市場規模は前年比12%増の500億円に達する見込み...",
    retrievedAt: "2025-01-15",
  },
  {
    id: 5,
    type: "web",
    title: "クラウド人事システム導入企業調査",
    url: "https://example.com/survey-adoption",
    excerpt: "中小企業の約35%がクラウド型人事システムの導入を検討中...",
    retrievedAt: "2025-01-15",
  },
  {
    id: 6,
    type: "youtube",
    title: "HR SaaS市場の今後 - 業界専門家インタビュー",
    url: "https://youtube.com/watch?v=example2",
    excerpt: "今後3-5年は年率12-15%の成長が続くと予測されます...",
    retrievedAt: "2025-01-15",
  },
  {
    id: 7,
    type: "internal",
    title: "市場成長率分析_2024Q4.xlsx",
    excerpt: "過去3年間のCAGRは13.5%で推移しており、今後も同水準の成長が期待できる...",
    retrievedAt: "2025-01-15",
  },
];

export default function ReportViewPage() {
  const params = useParams();
  const reportId = params.id;
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [showEvidencePanel, setShowEvidencePanel] = useState(true);

  const handleRegenerateChapter = (chapterId: number) => {
    console.log("章を再生成:", chapterId);
    alert(`第${chapterId}章を再生成します（デモ）`);
  };

  const handleAddEvidenceAndRegenerate = (chapterId: number) => {
    console.log("根拠追加して再生成:", chapterId);
    alert(`第${chapterId}章に根拠を追加して再生成します（デモ）`);
  };

  const handleExport = () => {
    console.log("エクスポート");
    alert("レポートをエクスポートします（デモ）");
  };

  const handleEvidenceClick = (evidenceId: number) => {
    const evidence = DUMMY_EVIDENCES.find((e) => e.id === evidenceId);
    if (evidence) {
      setSelectedEvidence(evidence);
      setShowEvidencePanel(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{DUMMY_REPORT.title}</h1>
            <p className="mt-1 text-sm text-gray-600">作成日時: {DUMMY_REPORT.createdAt}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowEvidencePanel(!showEvidencePanel)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {showEvidencePanel ? "根拠パネルを隠す" : "根拠パネルを表示"}
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              エクスポート
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* レポート本文 */}
          <div className={showEvidencePanel ? "lg:col-span-2" : "lg:col-span-3"}>
            {/* エグゼクティブサマリ */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-3">エグゼクティブサマリ</h2>
              <div className="text-gray-700 whitespace-pre-line">{DUMMY_REPORT.executiveSummary}</div>
            </div>

            {/* 目次 */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">目次</h2>
              <nav className="space-y-2">
                {DUMMY_REPORT.chapters.map((chapter, index) => (
                  <a
                    key={chapter.id}
                    href={`#chapter-${chapter.id}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {index + 1}. {chapter.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* 各章 */}
            {DUMMY_REPORT.chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                id={`chapter-${chapter.id}`}
                className="bg-white shadow rounded-lg p-6 mb-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {index + 1}. {chapter.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRegenerateChapter(chapter.id)}
                      className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                    >
                      章だけ再生成
                    </button>
                    <button
                      onClick={() => handleAddEvidenceAndRegenerate(chapter.id)}
                      className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                    >
                      根拠追加して再生成
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none text-gray-700">
                  {chapter.content.split(/(\[\d+\])/).map((part, i) => {
                    const match = part.match(/\[(\d+)\]/);
                    if (match) {
                      const evidenceId = parseInt(match[1]);
                      return (
                        <button
                          key={i}
                          onClick={() => handleEvidenceClick(evidenceId)}
                          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer hover:underline"
                        >
                          [{evidenceId}]
                        </button>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 根拠パネル */}
          {showEvidencePanel && (
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">根拠ソース</h2>

                {selectedEvidence ? (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <button
                      onClick={() => setSelectedEvidence(null)}
                      className="text-sm text-blue-600 hover:text-blue-800 mb-3"
                    >
                      ← 一覧に戻る
                    </button>
                    <div className="space-y-3">
                      <div>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                            selectedEvidence.type === "web"
                              ? "bg-green-100 text-green-700"
                              : selectedEvidence.type === "youtube"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {selectedEvidence.type === "web"
                            ? "Web"
                            : selectedEvidence.type === "youtube"
                            ? "YouTube"
                            : "内部資料"}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{selectedEvidence.title}</h3>
                      {selectedEvidence.url && (
                        <a
                          href={selectedEvidence.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {selectedEvidence.url}
                        </a>
                      )}
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        {selectedEvidence.excerpt}
                      </p>
                      {selectedEvidence.retrievedAt && (
                        <p className="text-xs text-gray-500">取得日時: {selectedEvidence.retrievedAt}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mb-4">
                    本文中の [数字] をクリックすると根拠の詳細が表示されます
                  </p>
                )}

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {DUMMY_EVIDENCES.map((evidence) => (
                    <div
                      key={evidence.id}
                      onClick={() => setSelectedEvidence(evidence)}
                      className="p-3 border border-gray-200 rounded hover:border-blue-300 cursor-pointer transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">[{evidence.id}]</span>
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
                            evidence.type === "web"
                              ? "bg-green-100 text-green-700"
                              : evidence.type === "youtube"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {evidence.type === "web"
                            ? "Web"
                            : evidence.type === "youtube"
                            ? "YouTube"
                            : "内部"}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {evidence.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
