// ai.routes.js
const express = require('express');
const aiController = require("../controllers/ai.controller");
const router = express.Router(); // also fixed from `express()` to `express.Router()`

router.post("/get-review", aiController.getReview);

module.exports = router;
