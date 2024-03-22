
#
# Builder
#
FROM node:18-alpine3.18 as builder

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY ./src ./src
COPY ./tsconfig.json .
RUN npm run build

#
# Runtime
#
FROM ghcr.io/puppeteer/puppeteer:22.4.1

WORKDIR /app

COPY --from=builder /app/build .

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci --omit=dev

ENTRYPOINT ["node"]
CMD ["main.js"]
