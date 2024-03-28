
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
FROM node:18

# install deps
RUN apt-get update && \
    apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
    xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable x11-apps apt-utils

# install dumb-init
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# puppeteer-crawler app
WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci --omit=dev

COPY --from=builder /app/build .

COPY ./entrypoint.sh .

ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "/bin/sh", "./entrypoint.sh" ]
