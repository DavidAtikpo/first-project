import sequelize from "../db/dbConfig.js";


const user = sequelize.define("user",{
    id:{
        type:DateTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
       primaryKey:true,
       allowNull:false,
    },
    username:{
    type:DataType.STRING,
    allowNull:false,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type: DataType.STRING,
        allowNull:false,
    },
},
    {timestamps:true});

    export default user;