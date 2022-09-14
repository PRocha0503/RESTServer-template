const { Schema, model } = require("mongoose");
//Exp: Crear un modelo en mongo
const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
	},
	email: {
		type: String,
		required: [true, "Mail is mandatory"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is mandatory"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: [true, "Role is mandatory"],
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

//Exp para cuando se conierta aJson quitar datos como contraseña o version
UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

//Exp Exportar el modelo a mongo
module.exports = model("User", UserSchema);
