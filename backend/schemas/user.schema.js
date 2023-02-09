const {model, Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    first_name : {
        type: String, 
        required:[true,"First name is a required field"]
    }, 
    last_name : {
        type: String, 
        required: [true, "Last name is a required field"]
    }, 
    image: {
        type: String
    },
    email: {
        type: String, 
        unique: true,
        required:[true, "Email is a required field"]
    },

    password: {
        type: String, 
    },
    phone: {type: String, required: [true, "Phone number was not provided"]},
    isSuperAdmin:{
        type: Boolean,
        default: false,
    }
   

});




userSchema.methods.checkDupe = function () {
	return new Promise(async (resolve, reject) => {
		const dupe = await model('User')
			.find({ email: this.email})
			.catch((err) => {
				reject(err)
			})
		resolve(dupe.length > 0)
	})
}


module.exports = model("User", userSchema);