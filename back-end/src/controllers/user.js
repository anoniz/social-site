const { userService, authService, mailService } = require('../services/index');
const { User } = require('../models/user/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const verifyEmail = async(req,res) => {
    try {
       const token = req.params.token;
       const decoded = authService.verifyJwtToken(token);
       if(decoded.err) {
        return res.send('Seems like your verification link has been expired. login to get new');
       }
       const resp = await userService.getUserByEmail(decoded.decoder.email);
       if(!resp.user) {
         return res.status(404).send('Sorry account doesnt exit. signup');
       }
       if(resp.user.isVerified) {
        // means account is already verified, redirect to home page in frontend
        return res.send('account already verified');
       }
       await resp.user.update({isVerified:true});
       await resp.user.save();
       return res.send("Account verified success");
    } catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong');
    }
}

const signup = async (req,res) => { 
    try {
        const resp = await userService.getUserByEmail(req.body.email);
        if(resp.user) {
            return res.status(400).send('Account Already Exists');
        }
        if(resp.error) { 
            return res.status(resp.error.code).send(resp.error.message);
        }
        const password_hash = await bcrypt.hash(req.body.password,8);
        const user = {
            id: uuidv4().toString(),
            ...req.body,
            password_hash,
            dob: new Date(req.body.dob)
        }
    
         const resp2 = await userService.createUser(user);
         if(resp2.error) {
            return res.status(resp2.error.code).send(resp2.error.message);
         }
          const payload = {
            name: resp2.createdUser.firstName + resp2.createdUser.lastName,
            host: req.headers.host,
            email: resp2.createdUser.email,
            token: authService.generateJwtToken({id:resp2.createdUser.id,email:resp2.createdUser.email},'6h')

          }
         const resp3 = await mailService.sendVerificationEmail(payload);
         if(resp3.error) {
            return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
         }
            res.status(200).send(`A verification email has been sent to 
            ${resp2.createdUser.email}. It will be expire in 6 hours. 
            If you not get verification Email click on resend token.`);

            //mkdir(resp.createdUser.id.toString());
            return;

    } catch(err) {
        console.log(err);
        return res.status(500).send({message:"something went wrong signup"})
    } 
}

const login = async (req,res) => {
   const {email, password} = req.body;
   try {
      const resp = await userService.getUserByEmail(email);
      if(!resp.user) {
        return res.status(400).send(`Account doesn't exist`)
      }
      if(resp.error) {
        return res.status(resp.error.code).send(resp.error.message);
      }
     const resp2 = await authService.passwordMatch(resp.user.password_hash,password);
     if(resp2.error) {
        return res.status(500).send('Something went wrong. in try');
     }
     if(!resp2.isMatch) {
        return res.status(401).send('Incorrect Credentials');
     }
     const payload = {
            id: resp.user.id,
            email: resp.user.email
        }
    const token = authService.generateJwtToken(payload,'3d');
    return res.status(200).send({authToken:token});
     
   } catch(err) {
       console.log(err);
       return res.status(500).send('something went wrong in catch');
   }
}

const logout = async (req,res) => {
    const token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
    return res.send({authToken:token});  // expired token // will be set to user 
}

const logoutAll = async (req,res) => {
    const resp = await userService.logoutEveryWhere(req.user);
    if(resp.error) {
        return res.status(resp.error.code).send(res.error.message);
    }
    return res.send(resp);
}

const changePassword = async (req,res) => {
    const {currentPass, newPass, confirmPass} = req.body;

    if(!(currentPass && newPass && confirmPass)) {
        return res.status(400).send({
            error:{message:`Please Provide currentPass, newPass, and confirmPass.`}})
    }
    if(req.body.confirmPass !== req.body.newPass) {
        return res.status(400).send({error: {message: "new and confirm password not match."}})
    }
    const resp = await authService.passwordMatch(req.user.password_hash,currentPass);
    if(resp.error) {
       return res.status(500).send('Something went wrong. in try');
    }
    if(!resp.isMatch) {
       return res.status(401).send('Incorrect Password');
    }
    const resp2 = await userService.updateUserPass(req.user,newPass);
    if(resp2.error) {
        return res.status(resp2.error.code).send(resp2.error.message);
    }
    const token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
    return res.send({authToken:token});  // expired token // will be set to user 
    // after change password user should login again i think.
}   

const sendForgotPasswordCode = async (req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return res.status(404).send({error: {message: "User Not Found"}});
    }
      
    // const code = randomCode();
    // try {
    //  const id = user._id;
    //  const createdCode = new confirmationCodes({userId:id,codeToken:code});
    //  await createdCode.save();
    //  const verifyUrl = `localhost:3000/users/forgot-password/${createdCode.codeToken}`;
    //  console.log(verifyUrl);
    //  res.redirect(verifyUrl);

    // } catch(err) {
    //     console.log(err);
    //     return res.status(500).send(const code = req.params.code;
    //   try {
    //    const codeFound = await confirmationCodes.findOne({codeToke:code})
    //    if(!codeFound) {
    //      return res.status(404).send({error: {message: "Invalid or Expired Code. Try Again."}});

    //    }
    //    return res.send("Ok Code Found");

    //   } catch(err) {
    //     console.log(err);
    //     return res.status(500).send("Something Went Wrong ");
    //   }"Something Went Wrong ");
    // }  
}

const recieveForgotPasswordCode = async (req,res) => {
    //   const code = req.params.code;
    //   try {
    //    const codeFound = await confirmationCodes.findOne({codeToke:code})
    //    if(!codeFound) {
    //      return res.status(404).send({error: {message: "Invalid or Expired Code. Try Again."}});

    //    }
    //    return res.send("Ok Code Found");

    //   } catch(err) {
    //     console.log(err);
    //     return res.status(500).send("Something Went Wrong ");
    //   }

}

// upload avatar / profile picture of user..

const uploadAvatar = async (req,res) => {
      try {
       // const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        console.log(req.file);
        req.user.avatar = req.file.buffer;
        await req.user.save(); 
        delete req.user.avatar;
        res.send("pic uploaded");

      } catch(err) {
         console.log(err);
         return res.status(500).send({error:{
            message: "Something went wrong. try again.", 
         },err});
      }
}

const getAvatar = async (req,res) => {
    try  {
        const user = await User.findById(req.params.id);
        
        if(!user || !user.avatar) {
          throw new Error("avatar not found ");
        }
        // setting header for sending image
        res.set('Content-Type','image/png');
        return res.send(user.avatar);
      } catch(e) {
        console.log(e);
        return res.status(400).send("something went wrong");
      }        
}

// auth middleware is getting called. req method have 
// access to user and tokens.
const getProfile = async (req,res) => {
    //  const p = req.user;
    //  return res.send(p);
    console.log("okkk")
    console.log(req.params);
    try {
         const user = await User.findById(req.params.id);
         if(!user) {
            return res.send("User Doesnt exist");
         }
         return res.send(user);
    } catch(e) {
        console.log("something went with getProfile no auth");
        return res.send("something went with getProfile no auth");
    }   
} 


module.exports = {
    signup,
    login,
    logout,
    logoutAll,
    changePassword,
    sendForgotPasswordCode,
    recieveForgotPasswordCode,
    getProfile,
    uploadAvatar,
    getAvatar,
    verifyEmail
}