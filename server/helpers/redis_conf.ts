// const { createClient } = require('redis');
import env from '../config/environment.json'
import * as redis from 'redis'
const clientRedis = redis.createClient();


class RedisConf{
  getRedis(key:string) {
    return new Promise((resolve, reject) => {
      
    });
  }
  setRedis(key:string, value:any) {
    clientRedis.set(key, value);
  }
  deleteRedis(key:string) {
    clientRedis.del(key);
  }
}

module.exports = new RedisConf();
