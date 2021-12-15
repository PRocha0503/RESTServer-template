const { Category } = require("../models");

const isValidCategory = async (req, res, next) => {
	const { id = "" } = req.params;
	const category = await Category.findById(id).populate("user", "name");
	if (!category) {
		return res.status(400).json({ msg: "ID DOES NOT EXIST" });
	}
	req.category = category;
	next();
};

module.exports = {
	isValidCategory,
};
