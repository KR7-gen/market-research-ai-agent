# **設計書**

## **Deep Research型 市場調査レポート生成ツール**

---

## **① 画面設計（UI）**

### **U1: ログイン画面 `/login`**

* メール入力欄  
* パスワード入力欄  
* ログインボタン

### **U2: レポート一覧 `/reports`**

* レポート一覧（タイトル、ステータス、作成日時）  
* 新規作成ボタン  
* 各レポートをクリック → 詳細へ

### **U3: レポート作成 `/reports/new`**

* テーマ入力欄（必須）  
* 目的、地域、期間（任意）  
* 根拠ソース優先順の選択（内部/YouTube/Web）  
* 生成開始ボタン

### **U4: 進捗画面 `/reports/:id/progress`**

* 全体進捗バー  
* 章ごとのステータス一覧（設計中/収集中/執筆中/完了/失敗）  
* 失敗章には「再実行」「スキップ」ボタン

### **U5: レポート閲覧 `/reports/:id`**

* サマリ  
* 章の本文  
* 引用リンク（クリックで根拠を表示）

### **A1: 管理ダッシュボード `/admin`**

* 本日の生成数、失敗率  
* YouTube字幕失敗率

### **A2: 内部資料管理 `/admin/documents`**

* 資料一覧（タイトル、カテゴリ、タグ、更新日）  
* アップロードボタン  
* アップロードフォーム（PDF/テキスト、カテゴリ、タグ）

### **A3: テンプレ管理 `/admin/templates`**

* テンプレ一覧  
* 編集フォーム（章構成）

### **A4: 品質ルール管理 `/admin/quality-rules`**

* ルール一覧（最低引用数、断定語チェックなど）  
* 編集フォーム（しきい値変更）

### **A5: ジョブ監視 `/admin/jobs`**

* ジョブ一覧（進行中/失敗/完了）  
* 失敗ジョブには「再実行」ボタン

---

## **② 機能設計**

### **ユーザー機能**

* **ログイン**: メール/パスワードで認証 → JWT発行  
* **レポート作成**: テーマ入力 → ジョブ発行 → 進捗画面へ  
* **進捗確認**: リアルタイムで章ごとの状態を表示（SSE）  
* **失敗章の再実行**: 失敗した章だけ再生成  
* **レポート閲覧**: 完成したレポートを読む、引用元を確認

### **バックグラウンド処理（Worker）**

* **Phase 1: 骨格生成**: LLMでテーマから8章構成を作成  
* **Phase 2: 調査設計**: 章ごとに検索クエリを生成  
* **Phase 3: 根拠収集**: 内部資料 → YouTube → Webの順で根拠を収集  
* **Phase 4: 執筆**: 固定テンプレで章本文を生成  
* **Phase 5: レビュー**: 引用数チェック、断定語チェック、LLMレビュー  
* **Phase 6: 統合**: サマリ生成、全体レポート完成

### **管理機能**

* **資料アップロード**: PDF/テキスト → チャンク分割 → ベクトル化 → 保存  
* **テンプレ編集**: 章構成の変更  
* **品質ルール編集**: 最低引用数などの変更  
* **ジョブ監視**: 失敗ジョブの確認と再実行

---

## **③ データ設計**

### **users（ユーザー）**

* user\_id  
* email  
* password\_hash  
* plan（Free/Standard/Pro）  
* created\_at

### **reports（レポート）**

* report\_id  
* user\_id  
* title  
* status（queued/running/completed/failed）  
* source\_priority（内部/YouTube/Webの優先順、JSON）  
* started\_at  
* finished\_at  
* final\_summary  
* final\_content

### **report\_inputs（レポート入力内容）**

* report\_id  
* theme\_text  
* purpose\_text  
* region  
* period  
* assumptions  
* focus\_points（JSON）

### **sections（章）**

* section\_id  
* report\_id  
* order\_no  
* title  
* status（planned/collecting/drafting/reviewing/completed/failed）  
* hypothesis\_draft  
* hypothesis\_final  
* requirements\_json（最低引用数などのJSON）  
* content

### **section\_queries（章ごとの検索クエリ）**

* query\_id  
* section\_id  
* query\_type（broad/deep/counter/fresh）  
* query\_text  
* executed

### **evidences（根拠）**

* evidence\_id  
* section\_id  
* source\_type（internal/youtube/web）  
* title  
* url  
* raw\_text  
* summary\_text  
* credibility\_label（公的/企業IR/ニュース/ブログ）  
* fetch\_method（tavily/readability/youtube\_transcript/internal\_chunk）  
* meta\_json（再生数、チャンネル名など、JSON）

### **citations（引用）**

* citation\_id  
* section\_id  
* evidence\_id  
* quote\_text  
* used\_in\_paragraph\_no

### **admin\_documents（内部資料）**

* document\_id  
* title  
* type（pdf/text）  
* category  
* tags（JSON）  
* status（active/inactive）  
* uploaded\_at

### **admin\_document\_chunks（資料の小分け）**

* chunk\_id  
* document\_id  
* chunk\_text  
* embedding\_vector（ベクトル型）  
* meta\_json（ページ番号など、JSON）

### **jobs（ジョブ）**

* job\_id  
* report\_id  
* status（queued/running/failed/completed）  
* attempts  
* timeout\_at  
* error\_message

### **job\_events（進捗ログ）**

* event\_id  
* job\_id  
* event\_time  
* event\_type（phase\_change/error/retry/info）  
* message\_user  
* message\_internal

