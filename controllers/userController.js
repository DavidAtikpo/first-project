import userModel from '../models/userModel.js';


const registerUser = async (req,res) =>{
    try{
        const addUser = req.body;
        const password = addUser.password;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashPassword",hashPassword);
        addUser.password =hashPassword;
        const email = addUser.email;
        const existingUser = await userModel.findOne({where:{email}});

        if (existingUser){
            return res.status(409).json({message:"User aleady exist"});
        }

        const newUser= await userModel.create(addUser);
        if (newUser){
            return res.status(201).json({message:"Succesful",user:newUser});

        }

    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Unable to create"});
    }

};

// user login

const loginUser = async(req, res)=>{
    const token =req.token;
    const userDetails= req.body;
    next();
};

// get user

const getUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await userModel.fndOne({where:{id}});

        if (user){
            return res.status(200).json({message:"Succesful",user});

        }
        else{
            return res.status(404).json({message:"User not found"});

        }
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"server side error"});
    };
}

// grt allUser

const getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.findAll({
            include: [
                {

                model: postModel,
                include:[{model: likeModel}],
                },
            ],
        });

        if (!users){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(201).json({message:"Successful",users});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error"});

    }
};

// update user

const updateUsers = async(req,res)=>{
    const {id} = req.params;
    const updateInfo = req.body;
    try {
        if(!id){
            return res.status(409).json({message:"User not found"});
        }

        const update = await userModel.update(updateInfo,{where:{id}});
        return res.status(200).json({message:"update successfuly",update});
   
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"server error"}); 
    }
}

// delete user

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(409).json({message:"user not found"});
        }
        const deleted = await userModel.destryoy({where:{id}});
        return res.status(201).json({message:"delete successfuly"});

    } catch (error) {
       console.log(error);
       return res.status(500).json({message:"server error"}); 
    }
};

// user post

const userPost =async(req,res)=>{
    const userId = req.userId;
    const posts = await postModel.findAll({where:{user_id: userId}});
    const user = await userModel.findOne({where:{id:userId},
        attributes:{
            exclude:["password","id","createdAt","updatedAt","deletedAt"],
        },
    });
    res.status(200).json({user, data: posts});
};

export default {registerUser, getUser, getAllUsers,updateUsers,deleteUser,userPost,loginUser};