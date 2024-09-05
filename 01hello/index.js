const http = require('http');
const fs = require('fs');


const newServer = http.createServer((req,res)=>{
	const log= `${Date.now()} |  ${req.url} new data is entry \n`;
	fs.appendFile("text.txt",log,(error,data)=>{

		if(req.url == "/"){
			res.end("Hii I use Node JS , Now In Home Page");
		}else if(req.url == "/about"){
			res.end("Hii I use Node JS , I am Ahemad");
		}else{
			res.end("404 , Not Found");
		}
	})
})

newServer.listen(8000,()=>{console.log("Server Start");})