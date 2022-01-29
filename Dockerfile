FROM node:16

WORKDIR /APP

COPY package*.json ./

# NOde Packages install 
RUN npm install

# Configure Package Management System (APT) & install MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add - \
&& sudo apt-get install gnupg \
&& wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add - \
&& echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list \
&& sudo apt-get update \
&& sudo apt-get install -y mongodb-org \
&& sudo systemctl start mongod

# Redis server
RUN apt-get install -y redis-server

# Redis server
RUN apt-get install -y redis-server

COPY . .

EXPOSE 3000

# Start MongoDB
CMD mongod --fork -f /etc/mongodb.conf \
 && redis-server /etc/redis/redis.conf \
 && ["npm","run","node:compile"] \
 && ["npm","start"]
