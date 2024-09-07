const express = require('express');
const {handleGetAllUsers , 
	handleAddNewCreate , 
	handleGetUserById , 
	handleUpdateById ,
	handleDeletebyId} = require("../controllers/index")
const router= express.Router();

router
	.route("/")
	.get(handleGetAllUsers)
	.post(handleAddNewCreate)

router
	.route("/:id")
	.get(handleGetUserById)
	.patch(handleUpdateById)
	.delete(handleDeletebyId)



module.exports = router;