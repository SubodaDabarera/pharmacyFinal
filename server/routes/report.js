const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");



// get specific
router.get("/report", reportController.getReport);



module.exports = router;