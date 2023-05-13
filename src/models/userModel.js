const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = process.env.secret;
// user schema , blue print, how user will look like,,
// ER model of user and its attributes..

// user entity class / set
const userModel = {
    fullname: {
        type: String,
        required: [true, 'Name is required']
    },
    nickname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email Should be unique, {VALUE}'],
        trim: true,
        validate(value) {
           if(!validator.isEmail(value)) {
             return new Error('Invalid Email..')
           }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8,'Password should be more than 8 characters.'],
       // maxlength: [16,"password can't exceed 16 character"],
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes("password")) {
            throw new Error('Password cannot contain "password"');
          }
        },
    },
    gender: {
        type: String,
        required: true,
        maxlength:[6,'how gender name can exceed 6 characters?'],
        lowercase: true, 
    },
    country: {
        type: String,
        required: true,
        uppercase: true,
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
    },
    age: {
       type: Date,
       require: true,
       validate(value) {
         if(!validator.isDate(value,{strictMode:true})) {
            return new Error('Invalid Date/Format , use example YYYY-MM-DD');
         }
       }
    },
    avatar: {
        type: Buffer,
        //required: [true, 'profile picture is required..'],
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
}

// creating user schema..
const userSchema = new mongoose.Schema(userModel, {
    timestamps:true
});

// some importanat functions 

// adding authoriazation tokens to user document.. 
userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({_id:user._id},jwtSecret);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

// Hash the plain text password before saving and after validation

userSchema.pre("save", async function (next) {
    const user = this;
  
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  
    next();
  });



// get age from date of birth

function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// hiding properties of user model before sending back...
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    userObject.age = getAge(userObject.age)
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}


//creating mongoose model..
const User = new mongoose.model('User',userSchema);

module.exports = User