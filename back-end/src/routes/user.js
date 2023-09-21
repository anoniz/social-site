const router = require('express').Router();
const  { auth } = require('../middlewares/index');
const  { avatarUpload } = require('../middlewares/index');
const { upload , errorMiddleware } = avatarUpload;
//const multer = require('multer');
//const sharp = require('sharp');
const { userController } = require('../controllers');

router.post('/api/signup', userController.signup);
router.post('/api/login',auth, userController.login);
router.post('/logout-all',userController.logoutAll); // see later
router.post('/api/logout',userController.logout);
router.post('/me/change-password',auth,userController.changePassword);
router.post('/api/forgot-password',userController.sendForgotPasswordCode);

router.post('/me/avatar',upload.single('avatar'),userController.uploadAvatar,(err,req,res,next) => {
    return res.status(401).send({error: err.message})
});

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
  

// Sign Up: POST /api/signup
// Log In: POST /api/login
// Log Out (optional, if you have sessions): POST /api/logout
// Change Password: POST /api/users/:userId/change-password
// Forgot Password (to request a reset link): POST /api/forgot-password
// Reset Password (using a reset token): POST /api/reset-password



module.exports = router;
