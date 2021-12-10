//Exp solo para que te salgan los metodos en vs code
const { response } = require("express");
//Exp para encryptar
const bcryptjs = require("bcryptjs");

//Exp importar user schema
const User = require("../models/user");
const Role = require("../models/role");

const usuariosGet = async (req, res = response) => {
	// Exp para los parms - son los que vienen despues de ?, para separarlos ente ellos es con un &
	//Exp el = en la desestructuracion es apr aponer defaults si no te lo mandan
	//const { id = 1 } = req.query;
	const { limit = 5, start = 0 } = req.query;

	//Expo promise. all las ejecuta al mismo tiempo para que sea más rapido
	const [total, users] = await Promise.all([
		User.countDocuments({ state: true }),
		User.find({ state: true }).skip(Number(start)).limit(Number(limit)),
	]);
	res.json({
		total,
		users,
	});
};
const usuariosPost = async (req, res = response) => {
	// Exp sacas el body de el request
	const { name, email, password, role } = req.body;
	// Exp crear instancia de usuario y mandar el cuerpo del request
	const user = new User({ name, email, password, role });
	//Exp hash contraseña, el numero es que tan complciado quieres que sea
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);
	//Exp Para gaurdar el usuario en mongo
	await user.save();
	res.json({
		user,
	});
	// const { role } = req.body;
	// const newRole = new Role({ role });
	// await newRole.save();
	// res.json({
	// 	newRole,
	// });
};
const usuariosPut = async (req, res = response) => {
	// Exp los paramas son lo que sacas de la url, vine como string
	const { id } = req.params;
	const { _id, password, google, ...rest } = req.body;
	if (password) {
		const salt = bcryptjs.genSaltSync();
		rest.password = bcryptjs.hashSync(password, salt);
	}
	const user = await User.findByIdAndUpdate(id, rest);
	res.json(user);
};

const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;
	//Exp lo borra roralmente de la abse de datos, no se recomienda
	//const user = await User.findByIdAndDelete(id);

	const user = await User.findByIdAndUpdate(id, { state: false });
	res.json({
		user,
	});
};
const usuariosPatch = (req, res = response) => {
	res.json({
		msg: " patch",
	});
};

module.exports = {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
};
