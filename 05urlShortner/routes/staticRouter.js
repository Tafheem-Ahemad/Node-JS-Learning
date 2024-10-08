const express = require('express');
const URL = require("../models/url")
const router = express.Router();

router
	.route("/")
	.get(async (req,res) => {
		const allURLs = await URL.find({});
		return res.render("home",{urls : allURLs})
	})

module.exports =router;