const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 9001; // Use port from .env or default to 9001
const MONGO_URI = process.env.MONGO_URI;

// Ensure MONGO_URI is properly loaded
if (!MONGO_URI) {
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });

const con = mongoose.connection;
con.on("open", () => console.log(" Connected to MongoDB"));
con.on("error", (err) => console.error("MongoDB Connection Error:", err));

app.use(express.json()); // Middleware to parse JSON

// Routes
const userRouter = require("./routers/user");
app.use("/user", userRouter);

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
