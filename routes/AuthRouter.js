const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddlewares");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/',userVerification)

module.exports = router;