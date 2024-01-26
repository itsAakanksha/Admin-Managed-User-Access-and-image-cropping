import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";


export const verifyjwt = asyncHandler(async(req,res, next) => {
  try {
      const token = req.cookies?.jwtoken || req.header("Authorization")?.replace("Bearer ", "")
      
    //   console.log(token);
      if (!token) {
          throw new ApiError(401, "Unauthorized request")
      }
  
      const decodedToken = jwt.verify(token,process.env.SECRET_STR)
    //  console.log("decoded token",decodedToken)
      
      const user = await User.findById(decodedToken.id)
    //   console.log(user)
      if (!user) {
          
          throw new ApiError(401, "Invalid Access Token")
      }
  
      req.user = user;
      next()
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token")
  }
  
})







// // this protect will check whether user is logged in for accessing resource or not

// const verifyjwt = asyncHandler(async (req, res, next) => {
//   // 1. Read the token and check if it exist
//   const testToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
//   let token;
//   if (testToken && testToken.startsWith("bearer")) {
//     token = testToken.split(" ")[1];
//   }
//   console.log("token",token);
//   if (!token) {
//     next(new ApiError("you are not logged", 401));
//   }
//   // 2.validate the token
//   const decodedToken = await promisify(jwt.verify)(
//     token,
//     process.env.SECRET_STR
//   );
//   console.log("decoded", decodedToken); // this will cause error, for it i have to check bearer and error response
//   // 3.If the user exist
//   const user = User.findById(decodedToken.id);
//   if (!user) {
//     const error = new ApiError(404, "user does not exist");
//     next(error);
//   }
//   // 4.allow user  to access route
//   req.user = user;
//   next();
// });
// export { verifyjwt };




