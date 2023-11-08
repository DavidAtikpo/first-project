import sequelize from "../db/dbConfig.js";
import DataTypes from "sequlize";
import likeModel from "./likesModel.js";


const post =sequlize.define("post",{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    titlie:{
        type: DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_id:{
        type:DataTypes.UUID,
        References:{
            model:"user",
            key:"id",
        },
    },
},{paranoid: true});
 (async()=>{
    await sequelize.sync()
 })();

 post.hasMany(likeModel,{foreignKey: "post_id"});
 likeModel.belongsTo(post,{foreignKey:"post_id"});

 export default post;