import {v2 as cloudinary} from "cloudinary"

import fs from "fs"

const uploadCloudinary = async (localFilePath) => {
        
    try {
        if(!localFilePath) return null

       const response= await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:"auto"
            }
            )
            console.log("Files is uploaded successfully on cloudinary",response.url);
        return response;
    } catch (error) {

        fs.unlinkSync(localFilePath);//remove the locally save temp file as the upload operation failed
        return null;
    }
}

          
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }); 

  export {uploadCloudinary}