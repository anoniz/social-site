const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.secret

const generateJwtToken = (payload,expiry) => {
      const token = jwt.sign(payload,JWT_SECRET,{expiresIn:expiry});
      return token;
}

const passwordMatch = async (actualPassword, userPassword) => {
    try {
        const isMatch = await bcrypt.compare(userPassword,actualPassword);
        return {isMatch};
    } catch(err) {
        console.log(err);
        return {error: 'error'}
    }
};

const verifyJwtToken = (token) => {
    try{
        const decoder = jwt.verify(token,JWT_SECRET);
        if(!decoder) return {err: {message: "unauthorised", code: 403}};
        return {decoder}
    }catch(error){
        console.log(error);
        return {error: {message: "Something went wrong, try again", code: 500}};
    }
}

module.exports = {
    generateJwtToken,
    verifyJwtToken,
    passwordMatch,
}