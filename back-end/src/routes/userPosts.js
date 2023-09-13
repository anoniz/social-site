const router = require('express').Router();
const { auth } = require('../middlewares/index')
const { postController } = require('../controllers/index');

router.post('/me/posts/',auth, postController.createPost);
router.get('/me/posts',auth,postController.getAllMyPosts);
router.get('/user-post/:id',auth,postController.getSinglePost);
router.get('/user-posts/:id',auth,postController.getAllPosts);
router.get('/user-post/like/:id',auth,postController.likeAPost);


module.exports = router;