const { UserPost } = require('../models/user/index');
const { postLike } = require('../models/user/index');

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
        // need userId and PostId to create a like on a post.
        const createdLike = await postLike.create(like);
        if(!createdLike) {
          return {error:{message:"something went wrong try again", code: 500}};
        }
        // now if like is created, we also need to update the post and return updated post
       const updatedPost = await UserPost.increment('total_likes', {where: {id:like.PostId}});
       console.log(updatedPost)
       return {likedPost:updatedPost}

    } catch(err) {
      console.log(err);
      return {error:{message:"something went wrong try again",code:500}}
    }
}


module.exports = {
    createPost,
    getSinglePost,
    getAllMyPosts,
    likePost
}