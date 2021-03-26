const Sequelize = require('sequelize');

//db connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost'
});

sequelize.authenticate()
.then(()=>{
    console.log("db connected");
})
.catch(err=>{
    console.log("db connection failed",err);
});

module.exports = sequelize;
