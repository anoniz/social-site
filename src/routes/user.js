const router = require('express').Router();
const auth = require('../middlewares/auth');
const { userController } = require('../controllers/index');

router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);
router.post('/users/logout',auth,userController.logout);
router.post('/users/logout-all',auth,userController.logoutAll);
router.post('/users/me/change-password',auth,userController.changePassword);
router.post('/users/reset-password');
router.post('/users/me/avatar',auth);
router.get('/users/me',auth,userController.getProfile);
router.get('/users/:id',auth,);
router.get('/users/me/avatar',auth,);
router.get('/users/:id/avatar',auth,);
router.patch('/users/me',auth,);
router.delete('/users/me/avatar',auth,);
router.delete('/users/me',auth,);





module.exports = router;
