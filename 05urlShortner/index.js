const express = require('express');
const path = require('path');
const {connectMongoDB} = require("./connections")
const URLRoute = require("./routes/url")
const URL = require("./models/url")
const staticRoute = require("./routes/staticRouter")


const app= express();
const PORT = 8000;

// MongoDB Connections
connectMongoDB("mongodb://127.0.0.1:27017/project02")

// EJS connected
app.set('view engine', 'ejs');
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/url",URLRoute)

app.use("/",staticRoute)


app.listen(PORT , () => {console.log("Server Is Started");})