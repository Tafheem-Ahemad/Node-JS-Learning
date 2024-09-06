const express = require('express');
const fs = require('fs');
let users = require('./MOCK_DATA.json');

const app =express();
const PORT = 8000;

// MiddleWare
app.use(express.urlencoded({extended : true}));


app.get("/users" , (req,res)=>{
	const html =`
	<ul>
		${
			users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")
		}
	</ul>
	`
	return res.send(html);
})
app.get("/api/users" , (req,res)=>{
	return res.json(users);
})

app
	.route("/api/users/:id")
	.get((req,res) => {
		const id=Number(req.params.id);
		const user=users.find((ele)=> ele.id === id);
		if(!user) return res.status(404).json({status : "Not Found"});
		return res.json(user);
	})
	.patch((req , res) => {
		const responceData= req.body;
		const id=Number(req.params.id);
		users.forEach((ele,index) => {
			if(id== ele.id) users[index]=  {...ele , ...responceData};
		})
		fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users),(err,data)=>{
			return res.json({status : "Succesful" , ...responceData});
		})
	})
	.delete((req , res) => {
		const id=Number(req.params.id);
		users=users.filter((ele) => id !== ele.id);
		fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users),(err)=>{
			if (err) {
				return res.status(500).json({ status: "Error", message: "Failed to write file" });
			}
			return res.json({status : "Succesfully Deleted"});
		})
	})

app.post("/api/users", (req , res) => {
	const data= req.body;
	console.log(data);
	if(!data || !data.first_name || !data.last_name || !data.email || !data.gender || !data.job_title){
		return res.status(404).json({status : "Please complete all"});
	}
	const newID= users[users.length-1].id + 1; 
	users.push({id : newID, ...data});
	fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users), (err, data) =>{
		return res.status(201).json({status : "success" ,id : newID});
	});
	
});



app.listen(PORT , () => {console.log(`Server is Start at PORT ${PORT}`);})