require('./db/mongoose');
const { userRouter } = require('./routes/index');
const express = require('express');
const app = express();
const port = process.env.PORT

app.use(express.json());

// home route 

app.get("/", (req, res) => {
    return res.send("APPLICATION IS UNDER DEVELOPEMENT PHASE ...");
});

app.use(userRouter);
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

 


