import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MONGODB CONNECTED");
    } catch (error) {
        console.log(error.message);
        process.exit(1);//exit with failure
    }
}