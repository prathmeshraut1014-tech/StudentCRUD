const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const studentRoutes = require("./Routes/studentRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/api", studentRoutes);

mongoose
    .connect(process.env.MONGO_URI)
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