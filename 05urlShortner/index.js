const express = require('express');
const {connectMongoDB} = require("./connections")
const {handeleGetOriginalPage} = require("./controllers/index")
const URLRoute = require("./routes/url")


const app= express();
const PORT = 8000;

// MongoDB Connections
connectMongoDB("mongodb://127.0.0.1:27017/project02")

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/:shortid", handeleGetOriginalPage)

app.use("/url",URLRoute)



app.listen(PORT , () => {console.log("Server Is Started");})