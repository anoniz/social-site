const { userService } = require('../services/index');

const signup = async (req,res) => {
     const resp = await userService.createUser(req.body);
     if(resp.error) {
        return res.status(resp.error.code).send(resp.error.message);
     }
     return res.send(resp);
}

const login = async (req,res) => {
    const resp = await userService.loginUser(req.body);
    if(resp.error) {
        return res.status(resp.error.code).send(resp.error.message);
    }
    return res.send(resp);
}

const logout = async (req,res) => {
    const resp = await userService.logoutUser(req.user,req.token);
    if(resp.error) {
        return res.status(resp.error.code).send(res.error.message);
    }
    return res.send(resp);
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
    const resp = await userService.alterPassword(req.user,currentPass,newPass);
    if(resp.error) {
        return res.status(resp.error.code).send(resp.error.message);
    }
    return res.send(resp);
}   

// auth middleware is getting called. req method have 
// access to user and tokens.
const getProfile = async (req,res) => {
     const p = req.user;
     return res.send(p);
} 


module.exports = {
    signup,
    login,
    logout,
    logoutAll,
    changePassword,
    getProfile,
}