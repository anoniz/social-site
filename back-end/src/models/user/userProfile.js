const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../db/sequelize');
const bcrypt = require('bcrypt');


const User = db.define('User', { 
  // Model attributes are defined here
  id:{ 
     type: DataTypes.STRING,  
     primaryKey: true
  },
  firstName: {
     type: DataTypes.STRING,
     allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
      type: DataTypes.STRING,
  },
  nickName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: {
        msg: 'email is required'
      }
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // len: {
      //   args: [8,16],
      //   msg: ' 8 > password < 16'
      // },
      notNull: {
        msg: 'password is required'
      },
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'gender is required'
      }
    },
    set(value) {
      this.setDataValue('gender',value.toUpperCase());
    }
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'country name is required'
      }
    },
    set(value) {
      this.setDataValue('country',value.toUpperCase());
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'city name is required'
      }
    },
    set(value) {
      this.setDataValue('city',value.toLowerCase());
    }
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull:false,
    validate: {
      isDate: {
        args:true,
        msg: 'provide date in format 2002-11-05'
      }
    },
    set(value) {
      const age = getAge(value);
      if(age < 18 || age > 90 ) {
        throw new Error('18 > age < 90')
      }
      this.setDataValue('dob',value);
    }
  },
  mobile: {
      type: DataTypes.STRING
  },
  registerdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
  },
  last_login: {
      type: DataTypes.DATE
  },
  avatar: {
    type: DataTypes.BLOB,
  },
  isVerified: {
     type: DataTypes.BOOLEAN,
     defaultValue: false, 
  }
}, {
  // Other model options go here
  schema: "user_schema"
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

module.exports = User;