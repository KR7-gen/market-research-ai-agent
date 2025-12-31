"use client";

import { useState } from "react";
import Header from "../../components/Header";

interface Document {
  id: number;
  name: string;
  category: string;
  tags: string[];
  uploadedAt: string;
  usageCount: number;
  fileSize: string;
}

const CATEGORIES = [
  "市場指標",
  "会計指標",
  "業界別KPI",
  "社内ポリシー",
  "調査レポート",
  "その他",
];

const TAG_OPTIONS = [
  "SaaS",
  "飲食",
  "D2C",
  "物流",
  "医療",
  "製造",
  "教育",
  "金融",
  "不動産",
  "EC",
];

// ダミーデータ
const DUMMY_DOCUMENTS: Document[] = [
  {
    id: 1,
    name: "SaaS市場調査_2024Q4.pdf",
    category: "市場指標",
    tags: ["SaaS"],
    uploadedAt: "2025-01-10",
    usageCount: 15,
    fileSize: "2.3 MB",
  },
  {
    id: 2,
    name: "飲食業界KPI一覧.xlsx",
    category: "業界別KPI",
    tags: ["飲食"],
    uploadedAt: "2025-01-08",
    usageCount: 8,
    fileSize: "1.1 MB",
  },
  {
    id: 3,
    name: "D2C化粧品市場レポート_内部.pdf",
    category: "調査レポート",
    tags: ["D2C", "製造"],
    uploadedAt: "2025-01-05",
    usageCount: 5,
    fileSize: "3.7 MB",
  },
  {
    id: 4,
    name: "医療機器規制ガイドライン.pdf",
    category: "社内ポリシー",
    tags: ["医療"],
    uploadedAt: "2024-12-20",
    usageCount: 12,
    fileSize: "1.8 MB",
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(DUMMY_DOCUMENTS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    category: "",
    tags: [] as string[],
    scope: "all",
  });

  const handleTagToggle = (tag: string) => {
    setUploadForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleUpload = () => {
    console.log("アップロード:", uploadForm);
    alert("ファイルをアップロードしました（デモ）");
    setShowUploadModal(false);
    setUploadForm({ category: "", tags: [], scope: "all" });
  };

  const handleDelete = (id: number) => {
    if (confirm("この資料を削除しますか?")) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">内部資料管理（RAG）</h1>
            <p className="mt-1 text-sm text-gray-600">
              レポート生成に使用する内部資料をアップロード・管理
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            アップロード
          </button>
        </div>

        {/* フィルタ */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm border px-3 py-2">
                <option value="">すべて</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">タグ</label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm border px-3 py-2">
                <option value="">すべて</option>
                {TAG_OPTIONS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">並び順</label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm border px-3 py-2">
                <option value="recent">最近アップロード</option>
                <option value="usage">利用回数が多い</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>
        </div>

        {/* 資料一覧テーブル */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  資料名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タグ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アップロード日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  利用回数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  サイズ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.usageCount}回
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.fileSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => alert(`編集: ${doc.name}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* アップロードモーダル */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">資料アップロード</h3>
              </div>

              <div className="px-6 py-4 space-y-4">
                {/* ファイル選択 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ファイル（PDF/テキスト）
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">クリックまたはドラッグ&ドロップ</p>
                    <p className="mt-1 text-xs text-gray-500">PDF, TXT, DOCX (最大10MB)</p>
                  </div>
                </div>

                {/* カテゴリ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    カテゴリ <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm border px-3 py-2"
                  >
                    <option value="">選択してください</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* タグ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">タグ（複数選択可）</label>
                  <div className="flex flex-wrap gap-2">
                    {TAG_OPTIONS.map((tag) => (
                      <label
                        key={tag}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer transition ${
                          uploadForm.tags.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={uploadForm.tags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="sr-only"
                        />
                        {tag}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 適用範囲 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">適用範囲</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="scope"
                        value="all"
                        checked={uploadForm.scope === "all"}
                        onChange={(e) => setUploadForm({ ...uploadForm, scope: e.target.value })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">全レポート</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="scope"
                        value="conditional"
                        checked={uploadForm.scope === "conditional"}
                        onChange={(e) => setUploadForm({ ...uploadForm, scope: e.target.value })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">特定条件のみ（タグに一致する場合のみ使用）</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadForm.category}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  アップロード
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
