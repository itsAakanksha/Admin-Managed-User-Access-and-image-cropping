import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

function signtoken(id) {
  console.log("what is prints : ",id)
 return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
}

const signup = asyncHandler(async (req, res, next) => {
    const {userId,password} = req.body;
    console.log("user id ",userId)

    if ([userId,password].some(
        (field) => field?.trim() === ''
    ))
     {
    throw new ApiError(400, 'all fields are required')
       }


const existedUser = await User.findOne({
    userId
})
if (existedUser) {
    throw new ApiError(409, 'username or email already existed')
}
  const newuser = await User.create(req.body);
  const token = signtoken(newuser._id);

  const createduser = await User.findById(newuser._id).select("-password");
  // res.status(201).json({
  //   status: "success",
  //   token,
  //   data: {
  //     user: createduser,
  //   },
  // });
  res.redirect('/login')

  console.log(createduser);
});

const login = asyncHandler(async (req, res, next) => {
  const { userId, password } = req.body;

  // checking are both of them present or not
  if (!userId || !password) {
    console.log('hello')
    throw new ApiError(500, 'email or password are not present')

  }
  // checking are the correct or not
  const user = await User.findOne({ userId });
  console.log("user: ",user)
   const isMatch = await user.isPasswordCorrect(password)
   console.log("isMatch :",isMatch)
  if (!user || !(await user.isPasswordCorrect(password))) {
    console.log("hii")
    throw new ApiError(500, 'email or password are not correct')
  }
//   console.log(user._id.toString()) ;
  const token = signtoken(user._id);
  res.cookie("jwtoken",token,{
    expires: new Date(Date.now() + 9000000000),
    httpOnly:true
  })
  console.log("this is token",token);

  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
  const role = user.role;
  console.log("role is ",user.role)
  if(role === 'admin'){
    
    res.redirect('/admin')
  }
  else{
    res.redirect('/user')
  }
// res.redirect('/admin')
});




// For defining what permissions will get according to their role
const restrict = (role) => {
  return (req, res, next) => {
    if (role.admin.id != role) {
      // we will get the user id as we are protecting by checking the user and defining user in req.user
      const error = ApiError(
        403,
        "You do not have permission to perform this action"
      );
      next(error);
    }
    next();
  };
};

export { signup, login, restrict };
