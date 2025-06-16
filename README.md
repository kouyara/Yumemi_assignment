# ゆめみのフロントエンドコーディング試験

## 環境構築（ローカルでの実行方法）
1. リポジトリをクローン:
  ```bash
  git clone git@github.com:kouyara/Yumemi_assignment.git
  ```
2. .envファイルの作成:
  プロジェクトのルートディレクトリの下に「.env」ファイルを作成。
  以下のように設定する。
  ```
  VITE_API_KEY=api_key
  ```
3. アプリを起動:
  ```bash
  npm run dev
  ```

## リンター・フォーマッター（Biome）の実行方法
1. コードの整形
  ```bash
  npm run format
  ```
2. Lint & Format チェック
  ```bash
  npm run check
  ```