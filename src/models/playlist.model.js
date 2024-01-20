import mongoose,{Schema, model} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playlistSchema= new Schema({
  name:{
    type:"string",
    required:true
  },
  description:{
    type:"string",
    required:true
  },
  videos:[
    {
        type:Schema.Types.ObjectId,
        req:"Video"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    req:"User"
  }


},{timestamps:true});

commentSchema.plugin(mongooseAggregatePaginate);

export const Playlist=mongoose.model("Playlist",playlistSchema);