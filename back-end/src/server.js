const sequelize = require('./db/sequelize');
//equire('./db/redis');
const { userRouter,userPostRouter } = require('./routes/index');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000
app.use(cors());
app.use(express.json());
 
// home route 

app.get("/", (req, res) => {
    return res.send("APPLICATION IS UNDER DEVELOPEMENT PHASE ...");
});

app.use('/',userRouter); 
app.use('/',userPostRouter);  

sequelize.sync({alter:true}).then(connection => {
    console.log("Database connected successfuly");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.log("Can not start server");
    console.log(err);
}) 


 


