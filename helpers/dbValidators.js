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

const emailExits = async (email) => {
	//Exp Verficiar si el correo existe
	const existEmail = await User.findOne({ email });
	if (!existEmail) {
		throw new Error("EMAIL DOES NOT EXIST");
	}
};

const userActive = async (email) => {
	//Exp Verficiar si el usuario esta activo
	const user = await User.findOne({ email });
	if (!user.state) {
		throw new Error("USER IS NOT ACTIVE");
	}
};

const allowedCollections = async (collection = "", collections = []) => {
	if (!collections.includes(collection)) {
		throw new Error("Invalid Collection");
	}
	return true;
};

module.exports = {
	isValidRole,
	isNewEmail,
	idExits,
	emailExits,
	userActive,
	allowedCollections,
};
