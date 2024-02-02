const router = require("express").Router();

const sendEmail = require("../controllers/ResetPassword")

router.post("/send-reset-link", sendEmail.sendResetLink)

router.post("/reset-password", sendEmail.resetPassword)

module.exports = router;