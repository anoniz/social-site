const  User = require('../models/index');
const bcrypt = require('bcrypt');

const createUser = async (user) => {
   try {
     const createdUser = new User(user);
     await createdUser.save();
     const token = await createdUser.generateAuthToken();
     return {createdUser,token};
   }
    catch(err) {
     console.log(err);
     return {error: {message: err.errors, code: 500}};
   }
}   

const loginUser = async (user) => {
    try {
        const foundUser = await User.findOne({email: user.email});
        if(!foundUser) {
          return {error:{message: 'Invalid Email or Password', code:401}}
        }
        const isMatch = await bcrypt.compare(user.password, foundUser.password);
        if(!isMatch) {
            return {error:{message: 'Invalid Email or Password', code:401}}
        }
        const token = await foundUser.generateAuthToken();
        return {token};
        
    } catch(err) {
       console.log(err);
       return {error: {message: err, code: 500}};
    }
}

const logoutUser = async (user,token) => {
  try {
    const tokens = user.tokens;
    tokens.splice(tokens.indexOf(token),1);
    user.tokens = tokens;
    await user.save();
    return {success: "Logout Done!"}

  } catch(err) {
      console.log(err);
      return {error: {message:err, code:500}}
  }   
}

const logoutEveryWhere = async (user) => {
     try {
       user.tokens = [];     
       await user.save();
       return {success: "Logged Out From All Devices.."};

     } catch(err) {
        return {error: {message:err, code:500}};
     }
}

const alterPassword = async (user,currentPass,newPass) => {
   try{
     const passMatch = await bcrypt.compare(currentPass,user.password);
     if(!passMatch) {
       throw new Error("Current Password Is Incorrect");
     }
     user.password = newPass;
     user.tokens = [];
     await user.save();
     return {success:"Password Changed Successfully.Please login Again with new password."};

   } catch(err) {
        return {error: {message:err.message, code:500}};
   }
}

const deleteUser = async () => {
    
}

const updateUser = async () => {
    
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    logoutEveryWhere,
    alterPassword,
    deleteUser,
    updateUser,
    
}
