const User = require("../models/user")


const handleGetAllUsers = async (req,res) => {
	const allUsers = await User.find({});
	return res.json(allUsers);
}

const handleAddNewCreate = async (req, res) => {
	const data=req.body;
	if( !data || !data.first_name || !data.last_name || !data.email || !data.gender){
		return res.status(404).json({error : "Please complete all Fleid"})
	}


	const result = await User.create({
		first_name : data.first_name,
		last_name : data.last_name,
		gender : data.gender,
		job_title : data.job_title,
		email : data.email
	})

	console.log("result" , result);
	

	return res.status(201).json({status : "This Entry is created"});
}


const handleGetUserById= async (req,res)=>{
	const id=req.params.id;
	const result = await User.findById(id);
	if(!result) return res.status(404).json({error : "Not Found"});
	return res.json(result);
}


const handleUpdateById = async (req,res)=>{
		
	const id = req.params.id;
	  const updateData = req.body;

	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	if (updateData.email) {
		const existingUser = await User.findOne({ email: updateData.email});
		if (existingUser) {
		  return res.status(400).json({ error: "Email is already in use" });
		}
	}

	await User.findByIdAndUpdate(id, updateData);
	return res.status(200).json({ success: "User updated successfully" });
}


const handleDeletebyId = async (req,res)=>{
	const id=req.params.id;
	const result = await User.findById(id);
	if(!result) return res.status(404).json({error : "Not Found"});
	await User.findByIdAndDelete(id);
	return res.status(202).json({succes : "Successfully Deleted"});
}


module.exports = {handleGetAllUsers , handleAddNewCreate , handleGetUserById , handleUpdateById ,handleDeletebyId};