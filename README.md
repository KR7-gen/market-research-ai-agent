# 市場調査レポート生成ツール

Deep Research型の市場調査レポートを自動生成するツールです。

## 特徴

- **骨格から設計**: 検索前に完成形を設計し、散らばった情報のまとめを防ぎます
- **多元的な根拠**: Web・YouTube・内部資料から根拠を収集し、信頼性を確保
- **章単位で保存**: 失敗しても完了章は保存され、失敗章だけ再実行可能

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React 19
- PostgreSQL
- Redis
- BullMQ
- Prisma

## 開発環境のセットアップ

### 必要な環境

- Node.js 18以上
- PostgreSQL
- Redis

### インストール

```bash
npm install
```

### 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/market_research?schema=public"
REDIS_URL="redis://localhost:6379"
```

### Redisのセットアップと起動

#### WSL2を使用する場合（推奨）

**方法1: npmスクリプトを使用（推奨）**

```bash
# Redisを起動
npm run redis:start

# Redisを停止
npm run redis:stop
```

**方法2: 手動で起動**

```bash
# WSL2でRedisをインストール（初回のみ）
wsl -d Ubuntu -e bash -c "sudo apt-get update && sudo apt-get install -y redis-server"

# Redisを起動
wsl -d Ubuntu -e bash -c "sudo service redis-server start"

# Redisの状態を確認
wsl -d Ubuntu -e bash -c "sudo service redis-server status"
```

**注意**: Workerを実行する前に、必ずRedisを起動してください。

#### Dockerを使用する場合

```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

#### Windowsネイティブ版を使用する場合

[Memurai](https://www.memurai.com/) または [Redis for Windows](https://github.com/microsoftarchive/redis/releases) をインストールしてください。

### データベースのセットアップ

```bash
# Prismaクライアントの生成
npm run prisma:generate

# データベースマイグレーションの実行
npm run prisma:migrate
```

### 開発サーバーの起動

```bash
# Next.js開発サーバー
npm run dev

# Workerプロセス（別ターミナルで実行）
npm run dev:worker
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### その他のコマンド

```bash
# Prisma Studio（データベースGUI）
npm run prisma:studio
```

## 画面構成

### 実装済み

- **ホーム画面** (`/`): サービス概要とナビゲーション
- **新規レポート作成** (`/reports/new`): レポート作成フォーム

### 今後実装予定

- **レポート一覧** (`/reports`): 作成したレポートの一覧
- **進捗画面** (`/reports/:id/progress`): レポート生成の進捗状況
- **レポート閲覧** (`/reports/:id`): 完成したレポートの表示
- **管理画面** (`/admin`): 内部資料管理、テンプレ管理など

## 新規レポート作成画面の機能

### 必須入力

- **テーマ**: 調査したいテーマを自由記述

### 任意入力

- **目的**: 参入判断、投資判断、競合比較など
- **対象地域**: 日本、北米、欧州など
- **期間**: 調査対象の期間（例: 直近3年、将来5年）
- **前提条件**: 価格帯、販売チャネルなどの前提
- **重視観点**: 市場規模、成長率、競合状況など（複数選択可）

### 根拠ソース優先順

- 内部資料、YouTube、Web検索の優先順位を設定可能
- ドラッグ不要で↑↓ボタンで並び替え
- 自動フォールバックオプション付き

## ビルド

```bash
npm run build
npm start
```

## ライセンス

ISC
