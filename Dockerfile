FROM node:16-alpine

WORKDIR /app

EXPOSE 3000

COPY ./package.json .

RUN yarn --frozen-lockfile

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY . .

RUN yarn build

RUN chmod a+x ./scripts/start.sh
RUN chown node:node ./scripts/start.sh

ENV NODE_ENV production

USER node
