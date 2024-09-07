const express = require('express');
const userRouter = require("./routes/user")
const {connectMongoDB} = require("./conections")

const PORT = 8001;
const app =  express();

// Connect Mongo DB
connectMongoDB("mongodb://127.0.0.1:27017/project01");

// Middleware
app.use(express.urlencoded({extended :  true}));

// routings
app.use("/api/users",userRouter)

app.listen(PORT , () => { console.log(`The code is running at PORT ${PORT}`);})