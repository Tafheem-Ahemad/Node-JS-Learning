const express = require('express');
const {handleGetNewId, handeleAnalytics ,handeleGetOriginalPage} = require("../controllers/index")
const router = express.Router();

router
	.route("/")
	.post(handleGetNewId)

router
	.route("/analytics/:id")
	.get( handeleAnalytics)

router
	.route("/:shortid")
	.get(handeleGetOriginalPage)


module.exports =router;