const { response } = require("express");

const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { createJWT } = require("../helpers/createJWT");

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

module.exports = {
	login,
};
