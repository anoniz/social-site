const { User } = require('../models/user/index');
const Sequelize = require('sequelize');
//const { Token } = require('../models/index');
const bcrypt = require('bcrypt');


const createUser = async(user) => {
  try {
      const createdUser = await User.create(user);
      if(!createdUser) return {error: {message: "Something went wrong, try again", code: 500}};
      return {createdUser: createdUser};
  } catch (error) {
      console.log(error);
      return {error: {message: "Something went wrong, try again", code: 500}};
  }
};

const getUserByEmail = async(email)=>{
  try{
      let user = await User.findOne({where:{email:{ [Sequelize.Op.iLike]:email}}});
       return  {user:user};
  } catch(error){
      console.log(error);
      return {error: {message: "Something went wrong, try again", code: 500}};
  }
  
};

const getUserById = async(id)=>{
  try{
      let user = await User.findOne({ where: {id} } );
       return  {user:user};
  } catch(error){
      console.log(error);
      return {error: {message: "Something went wrong, try again", code: 500}};
  }
  
};

const updateUserPass = async(user,newPass) => {
   try {
    const hash = await bcrypt.hash(newPass,9);
    user.password_hash = hash;
    const updatedUser = await user.save();
    if(!updatedUser) {
      return {error:{message:"something wrong with user.update"},code:500};
    }
    return {updated:true};
   } catch(err) {
    console.log(err);
    return {error:{message:"Something went wrong try again"},code:500};
   }
  
}

const destroyUser = async(id)=>{
  try{
      let user = await User.destroy({where:{id}});
       return  {Message:"User deleted successfully"};
  } catch(error){
      console.log(error);
      return {error: {message: "Something went wrong, try again", code: 500}};
  }
  
};


module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  destroyUser,
  updateUserPass
}