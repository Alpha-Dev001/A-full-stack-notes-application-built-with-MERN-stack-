import express from "express"
import cors from 'cors'
import dotenv from "dotenv";
import path from "path"

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/ratelimiter.js";

// Set NODE_ENV to production if not set (for deployment)
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

dotenv.config();

console.log(`Starting server in ${process.env.NODE_ENV} mode`);

const app = express()
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve()

// CORS configuration
const corsOptions = {
    origin: "*", // Allow all origins since frontend and backend are served together
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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
