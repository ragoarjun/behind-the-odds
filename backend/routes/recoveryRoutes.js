const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    getRecoveryData,

    startBreak,

    cancelBreak,

    getProtectionStatus

} = require("../controllers/recoveryController");

router.get(

    "/",

    auth,

    getRecoveryData

);

router.post(

    "/start-break",

    auth,

    startBreak

);

router.post(

    "/cancel-break",

    auth,

    cancelBreak

);

router.get(

    "/status",

    auth,

    getProtectionStatus

);

module.exports = router;