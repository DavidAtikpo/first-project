import likeModel from "../models/likeModel.js";


//Grtting Likes

const createLike = async(req,res)=>{
    try {
       const userId = req.userId;
       const addLike = req.body;
       aadLike["user_id"]=userId;

       const like = await likesModel.create(addLike);
       if(like){
        return res.status(200).json({message:"you just like a post"});
       }
    } catch (error) {
      console.log(error)
        return res.status(500).json({message:"like failed"});
    }
};

// Getting all like

const getAllLikes = async(req,res)=>{
    try {
       const likes = await likesModel.findAll();
       return res.status(200).json({message:"Successful", data: likes.length});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"like error"});
    }
};

//Deleting like

const deleteLike = async(req,res)=>{
    try {
        if(!id){
            return res.status(409).json({message:"like not found"});
        }

        const deleteLike = await likesModel.destroy({where:{id}});
        return res.status(200).json({message:"like deleted successfully"});

    } catch (error) {
      return res.status(500).json({message:"Delete faile"});  
    }
}

export default {createLike, getAllLikes,deleteLike};