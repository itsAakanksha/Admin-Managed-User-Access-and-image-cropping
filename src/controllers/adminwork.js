import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

function signtoken(id) {
    return jwt.sign({ id }, process.env.SECRET_STR, {
       expiresIn: process.env.LOGIN_EXPIRES,
     });
   }

const addUser = asyncHandler(async (req, res, next) => {
    const { userId, password } = req.body;
    console.log("user id ", userId);

    if ([userId, password].some(
        (field) => field?.trim() === ''
    )) {
        throw new ApiError(400, 'all fields are required');
    }

    const existedUser = await User.findOne({
        userId
    });

    if (existedUser) {
        throw new ApiError(409, 'username or email already existed');
    }

    req.body.role = 'user';
 
    const newuser = await User.create({
        userId,
        password,
        name: '',
        image: '',
        role:'user'

    });
    const token = signtoken(newuser._id);

    const createduser = await User.findById(newuser._id).select("-password");

    console.log(createduser);
    res.redirect('/admin/newuser');
});

const deleteuser = asyncHandler(async(req,res,next)=>{
    console.log("hii delete")
    const userIdToDelete = req.query.id;
    console.log(userIdToDelete)
    await User.findOneAndDelete({ userId: userIdToDelete });
    res.redirect('/admin/allusers');
   
})
const verifyuser = asyncHandler(async(req,res,next)=>{
    const verifieduser = req.query.id;
   const user =  await User.findOne({userId:verifieduser});
   console.log("veirfied:",verifieduser)
   if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
   user.isVerified = true;
  await user.save();
  res.redirect('/admin/allusers')
})

export { addUser,deleteuser,verifyuser };


