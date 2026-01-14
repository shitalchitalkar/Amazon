//normal signup user

const customerOnly =async(req, res,next)=>{

    if(req.userRole==='customer'){
        next();
    }else{
        res.status(403).json({
            message:"only signup user login allowed",
        });
    }
};

//admin-user middleware

const adminCustomer=async (req,res,next)=>{
    if(req.userRole==='admin-user'){
        next();
    }else{
        res.status(403).json({
            message:"admin user signin allowed"
        });
    }
};

//const admin-signin

/*const adminOnly=async(req,res,next)=>{
    if(req.userRole==='admin'){
        res.status(403).json({
            message:"only admin login"
        });
    }

};*/

module.exports={customerOnly,adminCustomer};