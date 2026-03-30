import mongoose from "mongoose"

export const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is required')
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.error("MongoDB connection failed:", error)
        process.exit(1) // exit with failure
    }
}