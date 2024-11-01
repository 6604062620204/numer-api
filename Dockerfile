FROM node:18

WORKDIR /app

COPY package.json ./

COPY pnpm-lock.yaml ./

COPY prisma ./prisma

RUN npm install -g pnpm

RUN pnpm install

COPY . .

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

CMD /wait-for-it.sh mysql_db:3306 -- pnpx prisma db push && pnpm dev
