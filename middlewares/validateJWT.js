const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	//Exp sacar la infod e los headers
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			msg: "NO TOKEN",
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		const user = await User.findById(uid);
		//Exp ver si el usuario es activo o si no existe
		if (!user.state || !user) {
			return res.status(401).json({
				msg: "INVALID TOKEN",
			});
		}
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({
			msg: "INVALID TOKEN",
		});
	}
};

module.exports = {
	validateJWT,
};
