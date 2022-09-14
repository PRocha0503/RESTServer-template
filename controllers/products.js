const response = require("express");
const { Product, Category } = require("../models");
const getProducts = async (req, res = response) => {
	try {
		const { limit = 5, start = 0 } = req.query;
		const [total, products] = await Promise.all([
			Product.countDocuments({ state: true }),
			Product.find({ state: true })
				.skip(Number(start))
				.limit(Number(limit))
				.populate("user", "name")
				.populate("category", "name"),
		]);
		res.json({
			total,
			products,
		});
	} catch (err) {
		console.log(err);
	}
};
const getProduct = async (req, res = response) => {
	try {
		const product = req.product;
		res.json({
			product,
		});
	} catch (err) {
		console.log(err);
	}
};
const createProduct = async (req, res = response) => {
	try {
		let { name, price, category, description, available } = req.body;
		category = category.toUpperCase();
		const categoryDB = await Category.findOne({ category });
		if (!categoryDB) {
			return res.status(400).json({ msg: "Invalid Category" });
		}
		name = name.toUpperCase();
		const productDB = await Product.findOne({ name });
		if (productDB) {
			return res.status(400).json({ msg: "Product already defined" });
		}
		const data = {
			name,
			price,
			category: categoryDB,
			description,
			available,
			user: req.user._id,
		};

		const product = new Product(data);
		await product.save();
		return res.status(201).json({ product });
	} catch (err) {
		console.log(err);
	}
};
const updateProduct = async (req, res = response) => {
	try {
		const { id } = req.params;
		let { state, user, ...rest } = req.body;
		rest.name = rest.name.toUpperCase();
		let product = await Product.findOne({ name: rest.name });
		if (rest.category) {
			rest.category = await Category.findOne({
				name: rest.category.toUpperCase(),
			});

			if (!rest.category) {
				return res.status(400).json({ msg: "Invalid Category" });
			}
		}
		const data = {
			user: req.user._id,
			...rest,
		};
		product = await Product.findByIdAndUpdate(id, data, { new: true });

		res.json({
			product,
		});
	} catch (err) {
		console.log(err);
	}
};

const deleteProduct = async (req, res = response) => {
	try {
		const product = req.product;
		product.state = false;
		4;
		await product.save();
		res.json({
			product,
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
