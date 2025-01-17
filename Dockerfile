FROM node:22-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run compile

RUN rm -rf src

EXPOSE 3000

CMD ["node", "dist/server.js"]