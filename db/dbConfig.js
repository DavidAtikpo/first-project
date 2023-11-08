import Sequelize from "sequelize";

const sequelize = new Sequelize('mini_project',
{
  host: "localost",
  dialect: "mysqul",
  logging: false
})

export default sequelize;