FROM node:14 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Install usr/src/account dependencies
RUN yarn
# Rebuild argon2 from source
RUN npm install -g node-pre-gyp
RUN node-pre-gyp rebuild -C ./node_modules/argon2

COPY . .

RUN yarn build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "yarn", "deploy" ]
