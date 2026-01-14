const { Pool } = require("pg");

console.log("db is loaded");
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

});

pool.query("SELECT 1").then(()=>{
    console.log("pg connected sucesfully");

});
//.catch((err)=>{
  //  console.error("postgressql connection error",err.message);
//});
 module.exports=pool;
