# ベースイメージとしてNode.js 18を使用
FROM node:18-alpine AS base

# 依存関係のインストール
FROM base AS deps
# pnpmをインストール
RUN npm install -g pnpm
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ビルドステージ
FROM base AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数を設定
ENV NEXT_TELEMETRY_DISABLED 1

# アプリケーションをビルド
RUN pnpm build

# 本番環境用のイメージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 必要なファイルをコピー
COPY --from=builder /app/public ./public

# 静的ファイルをコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 