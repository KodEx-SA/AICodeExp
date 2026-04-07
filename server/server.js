import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import OpenAI from "openai";

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

const API_KEY = process.env.NEBIUS_API_KEY;

const client = new OpenAI ({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: API_KEY,
});

app.post("/api/explain-code", async (req, res) => {
    try {
        const {code, language} = req.body;
        if (!code) {
            return res.status(400).json({error: "Code required!"});
        }
    } catch (err) {
        console.error("Code Explain API Error:", err);
        res.status(500).json({error: "Server error", details: err.message});
    }
});