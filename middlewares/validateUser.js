const { User } = require("../models");

const isValidUser = async (req, res, next) => {
	const { id = "" } = req.params;
	const user = await User.findById(id);
	if (!user) {
		return res.status(400).json({ msg: "ID DOES NOT EXIST IN USER" });
	}
	req.user = user;
	next();
};

module.exports = {
	isValidUser,
};
