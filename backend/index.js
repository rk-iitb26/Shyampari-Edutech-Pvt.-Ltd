const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const facultyRoutes = require("./routes/faculty");
const requestRoutes = require("./routes/requests");
const messageRoutes = require("./routes/messages");

const app = express();

// CORS
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "https://shyampari-edutech-pvt-ltd-delta.vercel.app",
    "https://shyampari-edutech-pvt-ltd-xrb1.vercel.app",
    "https://shyampariedtech.com",
    "https://www.shyampariedtech.com",
    "https://shyampari-edutech-pvt-ltd-1.onrender.com"
];

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/", (req, res) => res.json({ status: "ok", message: "Shampari Edutech API is running" }));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});