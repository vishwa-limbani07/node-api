const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Check Render environment variables.");
    process.exit(1);
}

// Connect to MongoDB with retry logic
async function connectToDB() {
    try {
        await mongoose.connect(MONGO_URI, { 
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 10s
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        setTimeout(connectToDB, 5000); // Retry after 5 seconds
    }
}

connectToDB();

app.use(express.json());

const userRouter = require("./routers/user");
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
