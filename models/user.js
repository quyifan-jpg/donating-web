const mongoose = require('mongoose')

const Users = mongoose.model('Users', new mongoose.Schema({
	Uid: {
		type: String,
		// required: true
		// unique: true
	},
	Username: {
		type: String,
		// required: true,
		// minlength: 1,
		unique: true
	},
	password: {
		type: String
		// required: true,
		// minlength: 1
	},
	admin: {
		type: Number
		// required: true,
		// default: 0
	},
	email: {
		type: String,
		sparse: true
		// minlength: 1
	},
	phone_number: {
		type: String,
		sparse: true
		// minlength: 1
	},
	likes: {
		type: Array,
		unique: false

	},
	notification: {
		type: Array,
		unique: false

		// minlength: 1
	}

	// UserAll:[
	//   {Uid:-1, Username:"admin", password:"admin", admin:1, email:"admin@mail.com", phone_number:"309309", likes:[],notification:["you are now log in as admin"] },
	//   {Uid:0, Username:"user1", password:"user1", admin:0, email:"user1@mail.com", phone_number:"111111", likes:[],notification:["welcome to furniture cycle"] },
	//   {Uid:1, Username:"user2", password:"user2", admin:0, email:"user2@mail.com", phone_number:"222222", likes:[],notification:["welcome to furniture cycle"] },
	//   {Uid:2, Username:"user3", password:"user3", admin:0, email:"user3@mail.com", phone_number:"333333", likes:[],notification:["welcome to furniture cycle"] },
	// ],
}))

module.exports = { Users }