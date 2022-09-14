const { Schema, model } = require("mongoose");
//Exp: Crear un modelo en mongo
const RoleSchema = Schema({
	role: {
		type: String,
		required: [true, "Role is mandatory"],
	},
});
//Exp Exportar el modelo a mongo
module.exports = model("Role", RoleSchema);
