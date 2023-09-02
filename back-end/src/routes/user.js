const router = require('express').Router();
const  { auth } = require('../middlewares/index');
const  { avatarUpload } = require('../middlewares/index');
const { upload , errorMiddleware } = avatarUpload;
//const multer = require('multer');
//const sharp = require('sharp');
const { userController } = require('../controllers');

router.post('/signup', userController.signup);
router.post('/login',auth, userController.login);
router.post('/logout-all',userController.logoutAll);
router.post('/me/change-password',auth,userController.changePassword);
router.post('/forgot-password',userController.sendForgotPasswordCode);

router.post('/me/avatar',upload.single('avatar'),userController.uploadAvatar,(err,req,res,next) => {
    return res.status(401).send({error: err.message})
});

router.get('/logout',auth,userController.logout);
router.get('/confirmation/:token',userController.verifyEmail);
router.get('/forgot-password/:code',userController.recieveForgotPasswordCode) // for getting code from url and verifying that code exists in db.
// router.get('/me/:id',userController.getProfile);
router.get('/:id',);
// router.get('/me/avatar/:id',userController.getAvatar);
router.get('/:id/avatar');
router.patch('/me',);
router.delete('/me/avatar',);
router.delete('/me',);

// fetch avatar by id
// router.get('/users/:id/avatar', async(req,res) => {
//     try  {
//       const user = await User.findById(req.params.id);
//       if(!user || !user.avatar) {
//         throw new Error();
//       }
//       // setting header for sending image
//       res.set('Content-Type','image/png');
//       return res.send(user.avatar);
//     } catch(e) {
//       return res.status(400).send("something went wrong");
//     }
// })
  


module.exports = router;
