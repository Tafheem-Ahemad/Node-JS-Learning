const express = require('express');
const mongoose = require('mongoose');

const PORT = 8001;
const app =express();

mongoose.connect("mongodb://127.0.0.1:27017/project01")
.then(()=>{ console.log(`MongoDB is Connected`);})
.catch((error) => {console.log("Error In MongoDB", error);})

const userSchema = new mongoose.Schema({
		first_name :{
			type : String ,
			required : true
		},
		last_name :{
			type : String ,
		},
		email :{
			type : String ,
			required : true,
			unique : true,
		},
		job_title :{
			type : String ,
		},
		gender:{
			type : String,
		}
},{ timestamps : true});

const User = mongoose.model("user",userSchema);


app.use(express.urlencoded({extended :  true}));

app.get("/users" , async (req,res) => {
	const allUsers = await User.find({});
	const html =
		`
		<ul>
			${allUsers.map((ele,index) => `<li> ${ele.first_name} - ${ele.email} </li>`).join("")}
		</ul>
		
		`

	return res.send(html);
})

app.get("/api/users" , async (req,res) => {
	const allUsers = await User.find({});

	return res.json(allUsers);
})

app
	.route("/api/users/:id")
	.get( async (req,res)=>{
		const id=req.params.id;
		const result = await User.findById(id);
		if(!result) return res.status(404).json({error : "Not Found"});
		return res.json(result);
	})
	.patch( async (req,res)=>{
		
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
	})
	.delete( async (req,res)=>{
		const id=req.params.id;
		const result = await User.findById(id);
		if(!result) return res.status(404).json({error : "Not Found"});
		await User.findByIdAndDelete(id);
		return res.status(202).json({succes : "Successfully Deleted"});
	})


app.post("/api/users",async (req, res) => {
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
})

app.listen(PORT , () => { console.log(`The code is running at PORT ${PORT}`);})