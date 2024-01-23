import { asyncHandler } from "../utils/asyncHandler.js";
import { Data } from "../models/userData.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadFileonCloudnary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
const uploadimage = asyncHandler(
    async(req,res,next)=>{
        const token = req.cookies?.jwtoken || req.header("Authorization")?.replace("Bearer ", "")
      
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.SECRET_STR)        
        const user = await User.findById(decodedToken.id)
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        console.log("got from cookies ",user)
       
        const {name} = req.body;
        console.log(name);
        console.log(req.files)
        const imageLocal = req.files?.image[0]?.path;
        if (!imageLocal) {
            throw new ApiError(400, 'image file is required')
        }
        const Image = await uploadFileonCloudnary(imageLocal);
        if (!Image) {
            throw new ApiError(400, 'image file is required its not uploaded on cloudinary')
        }

        const userdata = await User.updateOne(
            {userId:user.userId},
            {
                $set:{
            name:name,
            image:Image.url,
            }
        })



        console.log("userdata : ",userdata.userId);
        res.redirect('/user');
    
    }
)

export {uploadimage}