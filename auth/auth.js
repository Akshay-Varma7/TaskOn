const jwt = require("jsonwebtoken");
const JWT_SECRET = "key123key";

function auth(req,res,next){
    const token = req.headers.token;
    // localStorage.getItem("token");
    const decoded = jwt.verify(token,JWT_SECRET);
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).send({
            message: "unauthorized"
        })
    }
}

module.exports = {auth,JWT_SECRET};//not a function