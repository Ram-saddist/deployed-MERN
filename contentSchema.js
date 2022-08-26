const mongoose=require("mongoose");

const contentSchema={
	date:String,
	content:String
}
const Content = mongoose.model("users",contentSchema);

module.exports=Content;