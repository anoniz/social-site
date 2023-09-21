const router = require('express').Router();
const { auth } = require('../middlewares/index')
const { postController } = require('../controllers/index');

router.post('/api/posts',auth, postController.createPost);
// Update a Post: PUT /api/posts/:postId
// Delete a Post: DELETE /api/posts/:postId

router.get('/api/posts/me',auth,postController.getAllMyPosts);
router.get('/api/post/:id',auth,postController.getSinglePost);
router.get('/api/posts/:id',auth,postController.getAllPosts);
router.post('/api/posts/:id/likes',auth,postController.likeAPost);
// Unlike a Post: DELETE /api/posts/:postId/likes/:likeId

router.post('/api/posts/:Id/comments',auth,postController.commentOnAPost);
router.get('/api/posts/:id/likes',auth,postController.getAllLkesOnAPost);
router.get('/user-post/comments/:id',auth,postController.getAllCommentsOnAPost);

// Update a Comment: PUT /api/posts/:postId/comments/:commentId
// Delete a Comment: DELETE /api/posts/:postId/comments/:commentId


module.exports = router;