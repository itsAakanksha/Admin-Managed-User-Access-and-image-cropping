import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    userId :{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is require"],
        unique:true,
        
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    isVerified:{
        type:Boolean,
        enum:[true,false],
        default:false,
    },
    image:{
        type:String,
    },
    name:{
        type:String,
    },
})

 UserSchema.pre('save',async function (next){
     console.log("just before saving")
    if (!this.isModified('password')) return next();
    try {
        console.log(this.password)
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

UserSchema.methods.isPasswordCorrect = async function (password){
    console.log("password checking");
    return await bcrypt.compare(password,this.password);
    
}



export const User = mongoose.model('user',UserSchema);