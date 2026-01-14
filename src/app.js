const express=require('express');
const cors = require('cors');

const app = express(); 
const userRoute =require("./routes/userRoute");
const rolesRoute =require("./routes/rolesRoute");
const permissionRoute=require("./routes/permissionRoute");
            


app.use(cors());                                                                                               
app.use(express.json());
//app.use("/api", userRoute);


// routes

app.use('/api', userRoute);
app.use('/api', rolesRoute);
app.use('/api/permission',permissionRoute);

//test route
app.get("/api",(req,res)=>{
    res.send("API is running");
});



module.exports=app;