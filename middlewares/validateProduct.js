const { Product } = require("../models");

const isValidProduct = async (req, res, next) => {
	const { id = "" } = req.params;
	const product = await Product.findById(id)
		.populate("user", "name")
		.populate("category", "name");
	if (!product) {
		return res.status(400).json({ msg: "ID DOES NOT EXIST" });
	}
	req.product = product;
	next();
};

module.exports = {
	isValidProduct,
};
