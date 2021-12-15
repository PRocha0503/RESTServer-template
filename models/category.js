const { Schema, model } = require("mongoose");
//Exp: Crear un modelo en mongo
const CategorySchema = Schema({
	name: {
		type: String,
		required: [true, "Name is mandatory"],
		unique: true,
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},
	//Exp es para crear una referencia a otra clase
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User is mandatory"],
	},
});

CategorySchema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

//Exp Exportar el modelo a mongo
module.exports = model("Category", CategorySchema);
