import { v2 as cloudinary } from 'cloudinary'
import { response } from 'express'
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const uploadFileonCloudnary = async (localFilePath) => {
    try {
         console.log(localFilePath)
        if (!localFilePath) return null
        //   upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        })
        console.log(response);
        console.log('file has been uploaded on cloudinary', response.url)
          fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
         fs.unlinkSync(localFilePath)   //remove the local saved temporary file as the upload operation got failed
        return null
    }
}

export { uploadFileonCloudnary }
