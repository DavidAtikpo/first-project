import postsModel from "../models/postsModel.js";
import userModel from "../models/userModel.js";
import likeModel from "../models/likeModel.js";


// create posts

const createPost = async(req,res)=>{
    try {
        const addPost = req.body;
        const userId = req.userId;
        addPost["user_id"]=userId;
        const existingPost = await postsModel.findOne({where:{content:addPost.content}});
        if (existingPost){
            return res.status(409).json({message:"post exist already"})
        }
        // new post 

        const createPost = await postsModel.create(addPost);
        return res.status(200).json({message:"Successfull"});
   
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
};


//get post by id

const getPost = async(req,res)=>{
    try {
       const postId = req.params;
       const post = await postsModel.findOne({where:{id:postId}});
       if(!post){
        return res.status(409).json({message:"post not found"});
       }
        if(post){
            return res.status(200).json({message:"Successfull"});
        
       } 
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"An error occured while fetching post."});  
    }
};

//get all posts

const getAllposts = async(req,res) =>{
    try {
       const userId = req.userId;
       const allPosts = await postsModel.finall({
        include:[
            {
                model: likeModel,
            },
            {
                model: userModel
            },
        ],
       });

       if (!allPosts){
        return res.status(409).json({messge:"there's no post"});
       }
       if (allPosts){
        return res.status(200).json({message:"Successful",
    token:req.token,
    data:allPosts.length,
    allPosts,
    });
       }
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"An error sccurred while updating the post"})  
    }
};

// update post by id

const updatePost = async(req,res) =>{
    const postId = req.params.id;
    try {
        const updatePost = await postsModel.findOne({id: postId}, req.body,{new: true});
       res.json(updatePost);

    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"an error occurred while updating the post"});  
    }
};

//  delete post

const deletePost = async(req,res)=>{
    try {
       const postId = req.params;
       await postsModel.findOneAndDelete({id:postId});
       res.json({message:"post deleted Suuccessful"});
   
   
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error ocurred, coi;ld not delete post"});
    }
}

export default{createPost,getAllposts,getPost,updatePost,deletePost}