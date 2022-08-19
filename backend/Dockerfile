FROM --platform=linux/amd64 node:lts-buster-slim AS base

RUN apt-get update && apt-get install libssl-dev ca-certificates -y
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN pnpm install

COPY . .

RUN npm run build

EXPOSE 5000

# CMD npx prisma migrate deploy --name init && npm run dev
CMD npx prisma migrate dev --schema ./prisma/schema.prisma && npm run start
