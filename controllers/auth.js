const { response } = require("express");

const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { createJWT } = require("../helpers/createJWT");
const { googleVerify } = require("../helpers/googleVerify");

const login = async (req, res = response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	try {
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res
				.status(400)
				.json({ msg: "Invalid User/Password --incorrect password" });
		}
		//Exp create JWT
		const token = await createJWT(user.id);
		res.json({
			user,
			token,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: "Talk to admin",
		});
	}
};

const googleSingIn = async (req, res = response) => {
	const { id_token } = req.body;
	//Exp para crear un nuevo usuario
	try {
		const { name, img, email } = await googleVerify(id_token);
		let user = await User.findOne({ email });
		if (!user) {
			const data = {
				name,
				email,
				password: ":)",
				img,
				google: true,
				role: "USER_ROLE",
			};

			user = new User(data);
			await user.save();
		}
		if (!user.state) {
			return res.status(401).json({
				msg: "Blocked user",
			});
		}
		const token = await createJWT(user.id);
		res.json({
			user,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			msg: "Invalid Token",
		});
	}
};

module.exports = {
	login,
	googleSingIn,
};
