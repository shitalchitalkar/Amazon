const jwt=require("jsonwebtoken");
const pool=require('../config/db');

const protect=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split("")[1];
        if(!token){
            return res.status(401).json({message:"token missing"});
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    }catch(error){
        res.status(401).json({
            message:"unauthorized"
        });
    }
};

module.exports={protect};