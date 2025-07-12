# Site Status Checker Next.js

Next.js 14を使用したサイトステータスチェッカーアプリケーションです。

## Dockerでの起動方法

### 開発環境での起動

```bash
# 開発環境でアプリケーションを起動
docker-compose up app-dev

# バックグラウンドで起動する場合
docker-compose up -d app-dev
```

### 本番環境での起動

```bash
# 本番環境でアプリケーションを起動
docker-compose up app-prod

# バックグラウンドで起動する場合
docker-compose up -d app-prod
```

### 個別のDockerコマンドでの起動

```bash
# 開発環境用イメージをビルド
docker build -f Dockerfile.dev -t site-status-checker-dev .

# 開発環境でコンテナを起動
docker run -p 3000:3000 -v $(pwd):/app site-status-checker-dev

# 本番環境用イメージをビルド
docker build -t site-status-checker-prod .

# 本番環境でコンテナを起動
docker run -p 3000:3000 site-status-checker-prod
```

### コンテナの停止

```bash
# すべてのコンテナを停止
docker-compose down

# 特定のサービスを停止
docker-compose stop app-dev
docker-compose stop app-prod
```

## アクセス方法

アプリケーションが起動したら、ブラウザで以下のURLにアクセスしてください：

- http://localhost:3000

## 環境変数

必要に応じて以下の環境変数を設定できます：

- `NODE_ENV`: 実行環境（development/production）
- `NEXT_TELEMETRY_DISABLED`: Next.jsのテレメトリを無効化

---

# memo

- rlsの設計設定。
- prismaの導入
- ~~shadcnの導入~~
- ~~apikey内包した上でDB通信を可能とする。~~
- ~~console(backendside)の確認~~
- DBの型とtypescriptの型の違いについて
  - 自動出力する機能があったはず
- 実行環境について、会社のサーバーにアクセスしてdockerでnode,postgreなどの実行環境を構築する。
  - かなり後周し
- ui
  - ステータスコードの隣に緑か赤表示
  - card => data tableに変更したほうがいいかな
- ログイン後の画面しか入れない画面の制限するmiddlewareの設定
- 
# record
- DBaccessが伴う場合のhttp通信はNextApiResponse/Request,urlstatusを確認するときのhttp通信はNextResponse/Request

# 今後
- 初期画面は登録したurl情報を閲覧、検索するのみの機能を付与する。
- 対してurl画面はurlの登録、更新、削除とuser設定の更新、削除を担うものにする。
- ジョブの処理は実行時間を考慮したものをsql editorに記載して処理を分岐するようにする。
- 下記画面出し分けをリクエストするurlの情報を補うmiddleware作成で実施する
  - それぞれupdate,deleteのformコンポーネントも作成する。
  - home page
    - deleteは
      - created_at
      - url
      - company_nameを表示
  - user page
    - updateは
      - execution_time
      - url
      - company_nameを表示
    - deleteは
      - execution_time
      - url
      - company_nameを表示

