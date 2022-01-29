FROM node:16

WORKDIR /app

COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# NOde Packages install
RUN NODE_ENV=$NODE_ENV npm install -g nodemon && npm install

COPY . .

EXPOSE 3000

# Start Project
CMD ["npm","start"]
