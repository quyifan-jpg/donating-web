const mongoose = require('mongoose')

//      {id:7,name:"item8",owener:2,region:"Scarborough", location:'street h', description:"this is item 8", type : "lighting"}

// const ItemSchema = new mongoose.Schema({
//     name: String,
// 	owener: Number,
//     region: String,
//
// 	location: String,
// 	description:String,
// 	type:String
// });
//
// const Item = mongoose.model('User', ItemSchema);

const Items = mongoose.model('Items', new mongoose.Schema({
	id: {
		type: Number,
		// required: true
		// unique: true
	},
	name: {
		type: String
		// required: true,
		// minlength: 1,
		// unique: true
	},
	owener: {
		type: String
		// required: true,
		// minlength: 1
	},
	region: {
		type: String
		// required: true,
		// default: 0
	},
	location: {
		type: String
		// minlength: 1
	},
	description: {
		type: String
		// minlength: 1
	},
	type: {
		type: String
	}

	// ItemAll:[
	// 	{id:0,name:"item1",owener:0,region:"downtown", location:'street a', description:"this is item 1", type:"bed"},
	// 	{id:1,name:"item2",owener:0,region:"downtown", location:'street b', description:"this is item 2", type : "chair"},
	// 	{id:2,name:"item3",owener:1,region:"university", location:'street c', description:"this is item 3", type : "desk"},
	// 	{id:3,name:"item4",owener:1,region:"university", location:'street d', description:"this is item 4", type : "bed"},
	// 	{id:4,name:"item5",owener:1,region:"Scarborough", location:'street e', description:"this is item 5", type:"storage"},
	// 	{id:5,name:"item6",owener:1,region:"Scarborough", location:'street f', description:"this is item 6", type : "kitchen"},
	// 	{id:6,name:"item7",owener:2,region:"Scarborough", location:'street g', description:"this is item 7", type : "kitchen"},
	// 	{id:7,name:"item8",owener:2,region:"Scarborough", location:'street h', description:"this is item 8", type : "lighting"}
	// ],
}))

// const Items = mongoose.model('User', ItemSchema);

module.exports = { Items };