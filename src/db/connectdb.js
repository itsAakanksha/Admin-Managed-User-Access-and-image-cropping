import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connectioninstance = await mongoose.connect(process.env.MONGODB_URL)
      console.log(`\n mongodb connected !! db host ${connectioninstance.connection.host}`)
    } catch (error) {
        console.log("mongodb connection failed\n",error)
        process.exit(1)
    }
}
export default connectDB