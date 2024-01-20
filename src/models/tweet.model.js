import mongoose,{Schema, model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetSchema= new Schema({
  
     content:{
        type:"string",
        required:true
     },
     owner:{
        type:Schema.Types.ObjectId,
        req:"User"
     }

},{timestamps:true});

commentSchema.plugin(mongooseAggregatePaginate);

export const Tweet=mongoose.model("Tweet",tweetSchema);