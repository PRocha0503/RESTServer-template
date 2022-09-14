const response = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require("../models");
const allowedCollections = ["users", "categories", "products", "roles"];

const userSearch = async (term = "", res = response) => {
	if (ObjectId.isValid(term)) {
		const user = await User.findById(term);

		return res.json({
			results: [user ? [user] : []],
		});
	}
	//Exp hace que no sean case sensative
	const regexp = new RegExp(term, "i");
	//Exp hace la busqueda en muchos atributos
	const users = await User.find({
		$or: [{ name: regexp }, { email: regexp }],
		$and: [{ state: true }],
	});
	res.json({
		results: users,
	});
};
const categorySearch = async (term = "", res = response) => {
	if (ObjectId.isValid(term)) {
		const category = await Category.findById(term);

		return res.json({
			results: [category ? [category] : []],
		});
	}
	const regexp = new RegExp(term, "i");
	const categories = await Category.find({
		$or: [{ name: regexp }],
		$and: [{ state: true }],
	});
	res.json({
		results: categories,
	});
};
const productSearch = async (term = "", res = response) => {
	if (ObjectId.isValid(term)) {
		console.log("HEre");
		const product = await Product.findById(term).populate("category", "name");

		return res.json({
			results: [product ? [product] : []],
		});
	}
	const regexp = new RegExp(term, "i");
	const products = await Product.find({
		$or: [{ name: regexp }],
		$and: [{ state: true }],
	}).populate("category", "name");
	res.json({
		results: products,
	});
};

const search = (req, res = response) => {
	const { collection, term } = req.params;
	if (!allowedCollections.includes(collection)) {
		return res.status(400).json({
			msg: "Invalid collection",
		});
	}
	switch (collection) {
		case "users":
			userSearch(term, res);
			break;
		case "categories":
			categorySearch(term, res);
			break;
		case "products":
			productSearch(term, res);
			break;

		default:
			return res.status(500).json({
				msg: "Missing search",
			});
	}
};

module.exports = {
	search,
};
