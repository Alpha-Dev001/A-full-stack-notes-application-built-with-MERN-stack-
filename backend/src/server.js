import express from "express"
import cors from 'cors'
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/ratelimiter.js";


dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
    origin:"*",
    }
));
app.use(express.json());


app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
    next();
})

app.use('/api',rateLimiter);
app.get("/",(req,res)=>{
    res.send('Server is live');
})

app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`The server is runnig on port ${PORT}`);
  });
});
