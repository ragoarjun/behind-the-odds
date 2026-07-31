const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    startMinesGame,
    revealTile,
    cashOut
} = require("../controllers/gameController");

router.post(
    "/mines/start",
    protect,
    startMinesGame
);

router.post(
    "/mines/reveal",
    protect,
    revealTile
);

router.post(
    "/mines/cashout",
    protect,
    cashOut
);

module.exports = router;