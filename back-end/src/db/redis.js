const redis = require('redis');

let redisClient;

(async () => {
  redisClient = redis.createClient();

  //edisClient.on("error", (error) => console.error(`Error : ${error}`));

   redisClient.connect().then(result => {
    console.log("Connected to redis success");
   }).catch(err => {
    console.log(err);
   })
})();

module.exports = redisClient;