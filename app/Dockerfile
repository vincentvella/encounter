FROM nikolaik/python-nodejs:python3.9-nodejs14-alpine

RUN yarn global add expo-cli

RUN apk add --no-cache git

WORKDIR /usr/src/builder

COPY package.json .
COPY yarn.lock .

# --- Install dependencies ---
RUN yarn --pure-lockfile --network-timeout 1000000

# --- Compile Files ---
COPY . .

EXPOSE 19006

CMD ["yarn", "web"]