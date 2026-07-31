const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    startCrashGame,

    cashOut,

    getCrashPoint,

    crashGame

} = require("../controllers/crashController");

router.post(

    "/start",

    protect,

    startCrashGame

);

router.post(

    "/cashout",

    protect,

    cashOut

);

router.get(

    "/:id",

    protect,

    getCrashPoint

);

router.post(

    "/crash",

    protect,

    crashGame

);

module.exports = router;