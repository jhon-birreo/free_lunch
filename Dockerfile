FROM node

WORKDIR /APP

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","node:compile"]