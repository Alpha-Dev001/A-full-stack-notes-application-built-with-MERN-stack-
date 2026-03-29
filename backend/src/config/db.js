import mongoose from "mongoose"

export const connectDB = async() => {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED");
    }catch(error){
        console.log(error.message);
        process.exit(1);//exit with failure
    }
}