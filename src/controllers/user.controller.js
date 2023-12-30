import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from "../models/user.model.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser= asyncHandler(async(req,res)=>{

    const {fullName,email,username,password}=req.body
    console.log("email:",email)

    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required")
    }

   const existedUser= User.findOne({
        $or:[{username},{email}]  
    })

    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;///location of files of avatar
    console.log(avatarLocalPath)

    const coverImageLocalPath=req.files?.cover[0]?.path;
    console.log(coverImageLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }
    
    const avatar=  await uploadCloudinary(avatarLocalPath)
    const coverImage=  await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user= await  User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase

    })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   
   if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
   }


})

export {registerUser} 