const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    getTransactions,
    getStats,
    getActivity
} = require("../controllers/userController");

// User Profile
router.get("/profile", protect, getProfile);

// Transaction History
router.get("/transactions", protect, getTransactions);

// Analytics Dashboard
router.get("/stats", protect, getStats);

router.get("/activity", protect, getActivity);

module.exports = router;