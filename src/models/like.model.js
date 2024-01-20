import mongoose,{Schema, model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeSchema= new Schema({
   video:{
    type:Schema.Types.ObjectId,
    req:"Video"
   },
   comment:{
    type:Schema.Types.ObjectId,
    req:"Comment"
   },
   tweet:{
    type:Schema.Types.ObjectId,
    req:"Tweet"
   },
   likedBy:{
    type:Schema.Types.ObjectId,
    req:"User"
   }

},{timestamps:true});

commentSchema.plugin(mongooseAggregatePaginate);

export const Like=mongoose.model("Like",likeSchema);