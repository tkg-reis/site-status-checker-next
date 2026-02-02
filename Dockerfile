FROM node:24.13.0-bookworm

WORKDIR /workspace

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

RUN pnpm exec playwright install --with-deps

COPY . .

EXPOSE 3000

CMD ["sh"]