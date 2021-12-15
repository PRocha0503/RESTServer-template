const response = require("express");
const { Category } = require("../models");

const getCategories = async (req, res = response) => {
	try {
		const { limit = 5, start = 0 } = req.query;
		const [total, categories] = await Promise.all([
			Category.countDocuments({ state: true }),
			Category.find({ state: true })
				.skip(Number(start))
				.limit(Number(limit))
				.populate("user", "name"),
		]);
		res.json({
			total,
			categories,
		});
	} catch (err) {
		console.log(err);
	}
};
const getCategory = async (req, res = response) => {
	try {
		const category = req.category;
		res.json({
			category,
		});
	} catch (err) {
		console.log(err);
	}
};

const createCategory = async (req, res = response) => {
	try {
		let { name } = req.body;
		name = name.toUpperCase();
		const categoryDB = await Category.findOne({ name });
		if (categoryDB) {
			return res.status(400).json({ msg: "Category already defined" });
		}
		const data = {
			name,
			user: req.user._id,
		};

		const category = new Category(data);
		await category.save();
		return res.status(201).json({ category });
	} catch (err) {
		console.log(err);
	}
};
const updateCategory = async (req, res = response) => {
	try {
		let { name } = req.body;
		name = name.toUpperCase();
		const user = req.user._id;
		const category = req.category;
		const categoryName = await Category.findOne({ name });
		if (categoryName) {
			return res.status(400).json({ msg: "Category already defined" });
		}
		category.name = name;
		category.user = user;
		await category.save();
		res.json({
			category,
		});
	} catch (err) {
		console.log(err);
	}
};

const deleteCategory = async (req, res = response) => {
	try {
		const category = req.category;
		category.state = false;
		await category.save();
		res.json({
			category,
		});
	} catch (err) {
		console.log(err);
	}
};
module.exports = {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
