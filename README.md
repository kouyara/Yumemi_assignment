# 🧡 ゆめみ フロントエンドコーディング試験

都道府県ごとの人口推移をインタラクティブに閲覧できるフロントエンドアプリ  
公開 URL: <https://kouyara.github.io/Yumemi_assignment/>

- [Tech Stack](#-tech-stack)
- [Set Up And Run](#-set-up-and-run)
- [Testing](#-testing)
- [Linters And Formatters](#-linters-and-formatters)

## Tech Stack
| Category | Tool / Library | Version (例) |
| :-- | :-- | :-- |
| Framework | [React](https://react.dev/) + [Vite](https://vitejs.dev/) | 6.3.5 |
| Language  | TypeScript | 5.8.3 |
| Charting  | Highcharts | 12.2.0 |
| Lint / Format | ESLint, Prettier | |
| Test | Vitest | |
| CI | GitHub Actions | |

## Set Up And Run
1. リポジトリをクローン:
  ```bash
  git clone git@github.com:kouyara/Yumemi_assignment.git
  cd Yumemi_assignment
  ```
2. 依存をインストール
  ```bash
  npm ci
  ```
3. .envファイルの作成:
  プロジェクトのルートディレクトリの下に「.env」ファイルを作成。
  以下のように設定する。
  ```
  VITE_API_KEY=api_key
  ```
4. 開発サーバを起動:
  ```bash
  npm run dev
  ```

## Testing
1. 全テスト実行
  ```bash
  npm run test
  ```
2. テスト変更監視モード
  ```bash
  npm run test --watch
  ```

## Linters And Formatters
1. Prettierによるコード整形:
  ```bash
  npm run format
  ```
2. ESLintによるコードの静的解析
  ```bash
  npm run lint
  ```