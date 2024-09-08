const express = require('express');
const {handleGetNewId, handeleAnalytics} = require("../controllers/index")
const router = express.Router();

router
	.route("/")
	.post(handleGetNewId)

router
	.route("/analytics/:id")
	.get( handeleAnalytics)


module.exports =router;