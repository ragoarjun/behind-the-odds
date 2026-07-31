const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const {

    startPlinkoGame,

    dropBall,

    cashOut

} = require("../controllers/plinkoController");

router.post(

    "/start",

    protect,

    startPlinkoGame

);

router.post(

    "/drop",

    protect,

    dropBall

);

router.post(

    "/cashout",

    protect,

    cashOut

);

module.exports = router;