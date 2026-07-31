const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    startGame,

    spinReels,

    cashOut

} = require("../controllers/slotController");

router.post(

    "/start",

    auth,

    startGame

);

router.post(

    "/spin",

    auth,

    spinReels

);

router.post(

    "/cashout",

    auth,

    cashOut

);

module.exports = router;