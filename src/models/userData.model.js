import mongoose from "mongoose";
import { Schema } from "mongoose";

const DataSchema = new Schema({

    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    userId:{
     type:Schema.Types.ObjectId,
     ref:'user',
     unique:true
    }
})

export const Data = mongoose.model('Data',DataSchema)