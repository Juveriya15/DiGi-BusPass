const express = require('express');
const router = express.Router();
const {renewBusPass,applyForBusPass} = require('../controllers/BussPass');
const { auth } = require("../middlewares/auth");

router.post("/renewBusPass", auth, renewBusPass);
router.post("/applyForBusPass", auth, applyForBusPass);


module.exports = router;