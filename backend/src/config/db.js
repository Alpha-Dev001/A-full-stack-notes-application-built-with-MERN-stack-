import mongoose from "mongoose"

export const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is required')
    }

    console.log('Attempting to connect to MongoDB...')

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        })
        console.log("MONGODB CONNECTED")
    } catch (error) {
        console.error("MongoDB connection failed:", error)
        process.exit(1) // exit with failure
    }
}