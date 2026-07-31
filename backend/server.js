const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes");
const crashRoutes = require("./routes/crashRoutes");
const plinkoRoutes = require("./routes/plinkoRoutes");
const slotRoutes = require("./routes/slotRoutes");
const mysteryRoutes = require("./routes/mysteryRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Behind The Odds Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/crash", crashRoutes);
app.use("/api/plinko", plinkoRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/mystery", mysteryRoutes);
app.use("/api/recovery", recoveryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});