const http = require('http');
const fs = require('fs');
const url = require('url');

const newServer = http.createServer((req,res)=>{
	if(req.url == "/favicon.ico") return res.end();
	const log= `${Date.now()} |  ${req.url} new data is entry \n`;
	fs.appendFile("text.txt",log,(error,data)=>{

		const myurl= url.parse(req.url,true);
		console.log(myurl);
		
		if(myurl.query.name){
			res.end(`Hii I use Node JS , Wecome ${myurl.query.name}`);
		}else if(req.url == "/about"){
			res.end("Hii I use Node JS , I am Ahemad");
		}else{
			res.end("404 , Not Found");
		}
	})
})

newServer.listen(8000,()=>{console.log("Server Start");})