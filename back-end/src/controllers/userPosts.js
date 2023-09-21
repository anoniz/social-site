const { postService } = require('../services/index');
const { v4: uuidv4 } = require('uuid');


// these all routes are protected and going through the auth middle where
// so the contain req.token and req.user 

const createPost = async (req,res) => {
   try {
      const postId = uuidv4().toString();
      const {post_text} = req.body;
      const post = {
        id: postId,
        post_text: post_text,
        UserId: req.user.id
      }
      const resp = await postService.createPost(post);
      if(resp.error) {
         return res.status(resp.error.code).send(resp.error.message);
      }
      return res.status(201).send(resp);
   } catch(err) {
      console.log(err);
      return res.status(500).send("something went wrong with createPost");
   }
}

const getSinglePost = async (req,res) => {
      try {
        const postId = req.params.id;
         if(!postId) {
            return res.status(403).send("give me postId");
         }
         const resp = await postService.getSinglePost(postId);
         if(resp.error) {
            return res.status(resp.error.code).send(resp.error.message);
         }
         return res.send(resp);
      } catch(err) {
        console.log(err);
        return res.status(500).send("something went wrong with getSingle post");
      }
}

// for his own posts...
const getAllMyPosts = async (req,res) => {
    try {
         const resp = await postService.getAllMyPosts(req.user.id);
         if(resp.error) {
            return res.status(resp.error.code).send(resp.error.message);
         }
         return res.send(resp);
      } catch(err) {
        console.log(err);
        return res.status(500).send("something went wrong with getSingle post");
      }
}

const getAllPosts = async (req,res) => {
   try {
      const userId = req.params.id;
      const resp = await postService.getAllMyPosts(userId);
      if(resp.error) {
         return res.status(resp.error.code).send(resp.error.message);
      }
      return res.send(resp);
   } catch(err) {
      console.log(err);
      return res.status(500).send("something went wrong with getAllPosts");
   }
}

// someone likes a post
const likeAPost = async (req,res) => {
   // needs
   // who liked this post? req.user.id will tell us.
   // need post id, where this liked happened..
   const userId = req.user.id;
   const postId = req.params.id;
   const like = {
      id: uuidv4().toString(),
      UserId:userId,
      PostId:postId,
   }
   try {
     const resp = await postService.likePost(like);
     if(resp.error) {
      return res.status(resp.error.code).send(resp.error.message);
     }
     return res.status(201).send(resp);
   } catch(err) {
      console.log(err);
      return res.status(500).send("something went wrong with likeAPost");
   }
}

const commentOnAPost = async (req,res) => {
   // needs
   // who commented on post? req.user.id
   // comment content(text) 
   // and on post id , where he commented..
   const userId = req.user.id;
   const postId = req.params.id;
   const {comment_text} = req.body;     
   const comment = {
      id: uuidv4().toString(),
      comment_text: comment_text,
      UserId: userId,
      PostId: postId
   }
   try {
     const resp = await postService.commentPost(comment);
     if(resp.error) {
      return res.status(resp.error.code).send(resp.error.message);
     }
     return res.status(201).send(resp);
   } catch(err) {
      console.log(err);
      return res.status(500).send("something went wrong with likeAPost");
   }
}

const getAllLkesOnAPost = async (req,res) => {
   const postId = req.params.id;
   try {
      const resp = await postService.getAllLkes(postId);
      if(resp.error) {
         return res.status(resp.error.code).send(resp.error.message);
        }
      return res.send(resp);
   } catch(err) {
      console.log(err);
      return res.status(500).send("something went wrong with likeAPost");
   }
}

const getAllCommentsOnAPost = async (req,res) => {
   const postId = req.params.id;
   try {
      const resp = await postService.getAllComments(postId);
      if(resp.error) {
         return res.status(resp.error.code).send(resp.error.message);
        }
      return res.send(resp);
   } catch(err) {
      console.log(err);
      return res.status(500).send("something went wrong with likeAPost");
   }
}

module.exports=  {
    createPost,
    getSinglePost,
    getAllMyPosts,
    getAllPosts,
    likeAPost,
    commentOnAPost,
    getAllLkesOnAPost,
    getAllCommentsOnAPost
}