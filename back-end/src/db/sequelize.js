const { Sequelize } = require('sequelize');

const pass = process.env.PASSWORD;
const userName = process.env.USERNAMEE;
const dbname = process.env.DBNAME;

const sequelize = new Sequelize(dbname, userName, pass, {
  host:'localhost',
  dialect: 'postgres',
  logging:false
  //protocol: 'postgres',
  // logging: false,
  // dialectOptions: {
  //     ssl: {
  //         require: true,
  //         rejectUnauthorized: false
  //     }
  // }
});

module.exports = sequelize;


// async function connect() {

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// }

// connect();