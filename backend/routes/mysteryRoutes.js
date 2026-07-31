const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    startGame,

    openMysteryBox,

    cashOut

} = require("../controllers/mysteryController");

router.post(

    "/start",

    auth,

    startGame

);

router.post(

    "/open",

    auth,

    openMysteryBox

);

router.post(

    "/cashout",

    auth,

    cashOut

);

module.exports = router;