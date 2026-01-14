const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey";


//signup user
const signupUser =async (req,res)=>{
    try{
        const{fullname,email,password}=req.body;
//validation
        if(!fullname||!email||!password){
            return res.status(401).json({
                message:"user attribute are reaquired"
            });
        }

        const existuser=await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]);

      if(existuser.rows.length>0){
        return res.status(400).json({
            success: false,
            message:"user not fround"
        });
      }

       // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password, role)
       VALUES ($1, $2, $3, 'user')
       RETURNING id, full_name, email, role`,
      [full_name, email, hashedPassword]
    );

      res.status(201).json({
      success: true,
      message: "Signup successful",
      user: result.rows[0]
    });

  } catch (error) {
    
     res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

//signinuser



        
 

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    // check user exists
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    // password compare
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


  









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


module.exports={createUser,getUsers,updateUser,deleteUser,signupUser,signinUser};









