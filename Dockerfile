FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install 

RUN npm i -g serve

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
