import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// instantiate app
const app = express();

// security middleware

app.use(helmet());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    })
);

// limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request from the IP, please try again later"
})
app.use(limiter);

app.use(express.json({limit : "10mb"}));

app.post("/api/explain-code", async (req, res) => {
    
})