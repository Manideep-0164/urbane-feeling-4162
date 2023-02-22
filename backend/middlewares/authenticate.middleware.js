const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{              // User Authentication
    const token = req.headers.authorization;
    const key = process.env.JWT_KEY_U 
    try{
        jwt.verify(token, key, (err,decoded)=>{
            if(err) res.send({"error":`Please Login ${err.message}`});
            else {
               req.body.author = decoded.userID;
                console.log("athenticated");
                next();
            }
        })
    }
    catch(err){
        res.send({"error":err.message});
    }
}


const authenticateAdmin = (req,res,next)=>{         // Admin Authentication
    const token = req.headers.authorization;
    const key = process.env.JWT_KEY_A
    try{
        jwt.verify(token, key, (err,decoded)=>{
            if(err){
                if(err.message == "invalid signature") res.send({"error":`Authorization Invoked,You are Not an Admin`});
                else res.send({"error":`Please Login`});
            }
            else{
                console.log("Admin");
                next();
            }
        })
    }
    catch(err){
        console.log("fail")
        res.send({"error":err});
    }
}

module.exports = {
    authenticate,
    authenticateAdmin,
}