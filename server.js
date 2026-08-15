const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const studentRoutes = require("./Routes/studentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static("public"));

// API routes
app.use("/api", studentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });