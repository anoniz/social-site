const { UserPost } = require('../models/user/index');
const { postLike } = require('../models/user/index');
const { UserComment } = require('../models/user/index');

const createPost = async (post) => {
     try {
        const createdPost = await UserPost.create(post);
        if(!createdPost) {
            return {error:{message:"something went wrong try again", code: 500}}
        }
        return {createdPost:createdPost};
     } catch (err) {
         console.log(err);
         return {error:{message:"something went wrong try again",code:500}}
     }
}

const getSinglePost = async (postId) => {
      try {
          const post = await UserPost.findByPk(postId);
          if(!post) {
            return {error:{message:"post doesn't exist", code:404}}
          }
          return {post:post};
      } catch(err) {
        console.log(err);
        return {error:{message:"something went wrong try again",code:500}}
      }
}

const getAllMyPosts = async (userId) => {
    try {
         const posts = await UserPost.findAll({where:{UserId:userId}});
         if(posts.length === 0) {
            return {error:{message:"no posts yet.", code:404}};
         }  
         return {posts:posts};
    } catch(err) {
      console.log(err);
      return {error:{message:"something went wrong try again",code:500}}
    }
};

const likePost = async (like) => {
    try {
       // first let's see if a like already exits
       const exitingLike = postLike.findOne({where: {UserId: like.UserId}});
       if(exitingLike) {
         return res.status(409).json({ error: 'User has already liked this post' });
       }

        // need userId and PostId to create a like on a post.
        const createdLike = await postLike.create(like);
        if(!createdLike) {
          return {error:{message:"something went wrong try again", code: 500}};
        }
        // now if like is created, we also need to update the post and return updated post
       const updatedPost = await UserPost.increment('total_likes', {where: {id:like.PostId}});
       if(!updatedPost) {  // liked but post updation failed.
        // if post is not updated than we have to remove the like, that just created.
          await createdLike.destroy();
          return {error:{message:"something went wrong try again", code: 500}};
       }
       console.log(updatedPost)
       return {likedPost:updatedPost}

    } catch(err) {
      console.log(err);
      return {error:{message:"something went wrong try again",code:500}}
    }
}

const commentPost = async (comment) => {
  try {
      // need userId and PostId to create a like on a post.
      const createdComment = await UserComment.create(comment);
      if(!createdComment) {
        return {error:{message:"something went wrong try again", code: 500}};
      }
      // now if comment is created on some post,
      // we also need to update that post and return updated post,
     const updatedPost = await UserPost.increment('total_comments', {where: {id:comment.PostId}});
     if(!updatedPost) {   // commented but post updation failed.
      // if post is not updated than we have to remove the comment, that just created.
      await createdComment.destroy(); 
      return {error:{message:"something went wrong try again", code: 500}};
     }
     console.log(updatedPost)
     return {commentedOnPost:updatedPost}

  } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong try again",code:500}}
  }
}

const getAllLkes = async (postId) => {
   try {
      const likes = await postLike.findAll({where: {PostId:postId}});
      return {likes};
   } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong try again",code:500}}
   }
}

const getAllComments = async(postId) => {
  try {
    const comments = await UserComment.findAll({where: {PostId:postId}});
    return {comments};
 } catch(err) {
  console.log(err);
  return {error:{message:"something went wrong try again",code:500}}
 }
}

module.exports = {
    createPost,
    getSinglePost,
    getAllMyPosts,
    likePost,
    commentPost,
    getAllLkes,
    getAllComments
}