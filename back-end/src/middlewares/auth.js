const { User } = require('../models/user/index');
//const redisClient = require('../db/redis');
const jwt = require('jsonwebtoken');
const secret = process.env.secret;

const getToken = async(req,res,next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ','');
      //  console.log(token);
        const decoded = jwt.verify(token,secret);
        const id = decoded.id;
        let user;
        // check if we already have this user in redis cache..
       // const cachedUser = await redisClient.get(id);
        const cachedUser = 0;
        if(cachedUser) {
           user = JSON.parse(cachedUser);
          // console.log("cache hit");
        } 
         else {
           user = await User.findOne({where:{email:decoded.email}})
           //console.log("cache miss");
           if(!user) {
               throw new Error();
            }
          // await redisClient.set(id, JSON.stringify(user));
        }
        // console.log(user);
         req.token = token;
         req.user = user;
          return {next};
     } catch(err) {
         console.log(err); 
         return {error:{message:'please authenticate',code:401}};
     }    
}

const auth = async(req,res,next) => {
    if(req.originalUrl == '/login') {
        let token;
        try {
         token = req.header('Authorization').replace('Bearer ','');
         const decoded = jwt.verify(token,secret);
         if(!decoded) {
            return res.send('please authenticate');
         } 
        } catch (err) {
            next();
            return;
        }
        if(token.includes('Bearer')) {
            next();
           return;
        } 
         else {
            return res.status(403).send({error: {message: "Already Logged in."}});
         }
    }

    const resp = await getToken(req,res,next);
    //console.log("i am resp :", resp.error);
    if(resp.error) {
        return res.status(resp.error.code).send(resp.error.message);
    }
    resp.next();
}
  

module.exports = auth;