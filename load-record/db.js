const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("litter_keeper", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const User = sequelize.define("user", {
  nickname:DataTypes.STRING,
  openid:DataTypes.STRING,
  phone:DataTypes.STRING,
},{
  freezeTableName:true
});

// 数据库初始化方法
async function init() {
  await User.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  User,
};


