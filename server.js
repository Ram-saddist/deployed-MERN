const express= require('express');
const app= express();
const cors= require("cors");
const mongoose=require("mongoose");
const Content=require("./contentSchema")
const bodyParser = require('body-parser')
const Pusher = require("pusher");
const port =2005;
const path=require("path")
require("dotenv").config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//mongo connection
mongoose.connect("mongodb+srv://cbit_internship:Cbit_internship@cluster0.ldswjnw.mongodb.net/demo?retryWrites=true&w=majority")
	.then(()=>{
		console.log("connected successfully")
	})




//pusher connection
const pusher = new Pusher({
  appId: "1263426",
  key: "2ba2c2d4fcf289e8295a",
  secret: "3a7e4c1238144fd42e69",
  cluster: "ap2",
  useTLS: true
});

/*app.get('/',(req,res)=>{
	res.send("working")
})*/

app.post("/create",async (req,res)=>{
	const {date,content}=req.body;
	console.log(req.body)
	const newContent= new Content({
		date,
		content
	});
	await newContent.save()
})

/*
.then(c=>{
		pusher.trigger("content", "insert", 
				{
				  date:c.date,
				  content:c.content
				}
			);
		return res.json({success:true})
	});
*/

app.delete('/delete/:id',(req,res)=>{
	const id=req.params.id;
	Content.findByIdAndRemove(id).exec();
})

app.get("/get",async(req,res)=>{
	await Content.find()
	.then(found=>res.json(found))
})

if(process.env.NODE_ENV==="production"){
	 app.use(express.static("client/build"));
	 app.get("*",(req,res)=>{
	 	res.sendFile(path.resolve(__dirname,"client","build","index.html"));
	 });
}

app.listen(process.env.PORT||port,()=>console.log("running on port 2005"))