import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Data } from "../models/userData.model.js";
import jwt from "jsonwebtoken";

const adminwork = async(req,res)=>{
    const users = await User.find({role:'user'}, 'userId').limit(3);

res.render('adminoption',{user:users})
}

const getuser = async(req,res)=>{

    // const users = await User.find({role:'user'})
    const users = await User.find({role:'user'}, 'userId').limit(3);

     console.log(users)

   res.render('adminoption',{user:users})
}
const allusers = async(req,res)=>{
    const users = await User.find({role:'user'});
    console.log("user::",users)
    res.render('table',{user:users})
}



const userDashboard = async(req,res)=>{
    const token = req.cookies?.jwtoken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token,process.env.SECRET_STR)        
    const user = await User.findById(decodedToken.id)
    if (!user) {
        
        throw new ApiError(401, "Invalid Access Token")
    }
  
    const profileimage = user.image;
    const name = user.name;
    const isverify = user.isVerified;

    res.render('upload', { name,  profileimage, isverify });
}





export {adminwork,getuser,allusers,userDashboard}

