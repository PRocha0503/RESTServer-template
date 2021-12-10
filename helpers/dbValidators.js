const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
	const roleExists = await Role.findOne({ role });
	if (!roleExists) {
		throw new Error("NOT A VALID ROLE");
	}
};
const isNewEmail = async (email) => {
	//Exp Verficiar si el correo existe
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error("EMAIL ALREADY REGISTERD");
	}
};

const idExits = async (id) => {
	//Exp Verficiar si el id existe
	const existID = await User.findById(id);
	if (!existID) {
		throw new Error("ID DOES NOT EXIST");
	}
};

module.exports = {
	isValidRole,
	isNewEmail,
	idExits,
};
