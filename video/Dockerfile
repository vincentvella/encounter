
FROM node:alpine

WORKDIR '/app'

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY .env .
COPY .env.example .

COPY . .

CMD ["yarn", "start"]