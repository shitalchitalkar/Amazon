const pool = require("../config/db");


//create user
    const createUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const result = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [full_name, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//all user result
const getUsers = async (req, res) =>{
    try{
        
        const result=await pool.query("SELECT * FROM users");
        res.status(200).json(result.rows);
    }catch(error){
        res.status(500).json({message:"error msg"});
    }
};
//update

const updateUser= async (req,res)=>{
    try{
        const{id}=req.params;
        const {full_name,email}=req.body;

        const result= await pool.query(
      "UPDATE users SET full_name=$1, email=$2 WHERE id=$3 RETURNING *",
      [full_name, email, id]
    );
        res.status(200).json(result.rows[0]);

    }catch(error){
          console.log("UPDATE ERROR", error);
        res.status(500).json({ message:"message error"});
    }
};

//delete user
const deleteUser =async (req,res)=>{
    try{
        const {id}=req.params;

        const result=await pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]);
        res.status(201).json(result.rows[0]);
    }catch(error){
        res.status(500).json({message:"error message"});
    }
}


module.exports={createUser,getUsers,updateUser,deleteUser};









