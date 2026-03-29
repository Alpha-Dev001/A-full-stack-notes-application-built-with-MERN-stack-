import express from "express"
import cors from 'cors'
import dotenv from "dotenv";
import path from "path"

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/ratelimiter.js";


dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve()

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? false // In production, this should be your actual frontend domain
        : "*", // Allow all origins in development
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());


app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next();
})

app.use('/api', rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    // Handle client-side routing - return index.html for any non-API routes
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is runnig on port ${PORT}`);
    });
});
