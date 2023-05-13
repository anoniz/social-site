const mongoose = require('mongoose');
const url = process.env.CONNECTION_URL;
mongoose.set('strictQuery', true);
const connection =  mongoose.connect(url);

connection.then(result => {
    console.log("Database Connected Success.");
}).catch(err => {
    console.log(err);
})

