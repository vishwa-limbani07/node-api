const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9002; // Use Render's assigned PORT
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Check Render environment variables.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

app.use(express.json());

const userRouter = require("./routers/user");
app.use("/user", userRouter);

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
