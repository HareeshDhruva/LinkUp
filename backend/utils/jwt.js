import jwt from "jsonwebtoken"

const tokengeneration = (userId,res)=>{
    const token = jwt.sign({userId},process.env.SECRECT,{expiresIn:"15d"});
    res.cookie("jwt",token,{
        path:"/",
        maxAge: 90000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })
}

export default tokengeneration;