
//create role

const pool = require("../config/db");

const rolesCreate =async (req,res)=>{
    try{
    //const {id}=req.params;
    const{name}=req.body;

     if (!name) {
      return res.status(400).json({ message: "Role name is required" });
    }

    const result = await pool.query("INSERT INTO roles (name) VALUES ($1) RETURNING *",
      [name]
    );
     res.status(201).json(result.rows[0]);
}catch(error){
    console.error(error);
    res.status(500).json({message:"error message"});

}
};

//get all roles
const rolesGet=async(req,res)=>{
    try{
        const result=await pool.query("SELECT * FROM roles");
        res.status(200).json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"error message"});
    }
}

//update role

const rolesUpdate=async(req,res)=>{
    try{
        const{id}=req.params;
        const{name}=req.body;

        const result=await pool.query("UPDATE roles SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

     if (result.rows.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

        res.status(200).json(result.rows[0]);
    }catch(error){
        res.status(500).json({message:"error message"});
    }
};

const rolesDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM roles WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role deleted successfully",
      role: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error message" });
  }
};


//assignrole to admin

/*const assignRole = async (req, res) =>  {
    try{
        console.log("ASSIGN ROLE API HIT");

         console.log("REQ BODY ", req.body);
        const{roleid,userid}=req.body;

        //validation
        /* if (!userid || !roleid) {
      return res.status(400).json({
        message: "userID and roleID are required"
      });
    }

        const result=await pool.query(
      "UPDATE users SET role_id = $1 WHERE id = $2 RETURNING *",
      [roleid, userid]
        );

        if(result.rows.length===0){
            return res.status(401).json({message:"user not found"});
        }
        res.status(200).json({
      message: "Role assigned successfully",
      user: result.rows[0]
    });

    }catch(error){
        console.error("REAL ERROR ", error);
    return res.status(500).json({
        message: error.message
        });
    }
};*/



const assignRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    // Check if the role is already assigned
    const check = await pool.query(
      "SELECT * FROM user_roles WHERE user_id=$1 AND role_id=$2",
      [user_id, role_id]
    );
    if (check.rows.length > 0) {
      return res.status(400).json({ message: "Role already assigned to this user" });
    }

    // Assign role
    const result = await pool.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *",
      [user_id, role_id]
    );

    res.status(201).json({
      message: "Role assigned successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports={rolesCreate ,rolesGet,rolesUpdate,rolesDelete,assignRole};