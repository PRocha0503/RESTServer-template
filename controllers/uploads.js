const path = require("path");
const fs = require("fs");
const response = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");
const loadFile = async (req, res = response) => {
	try {
		const fileName = await uploadFile(req.files);
		return res.json({
			fileName,
		});
	} catch (e) {
		console.log(e);
		res.status(400).json({ msg: e });
	}
};

const uploadImgCloud = async (req, res = response) => {
	const { collection, id } = req.params;
	let model;
	switch (collection) {
		case "users":
			model = User;
			break;
		case "products":
			model = Product;
			break;
		default:
			return res.status(500).json({ msg: "ADD CATEGORY" });
	}

	const existance = await model.findById(id);
	if (!existance) {
		return res.status(400).json({ msg: "ID DOES NOT EXIST IN CATEGORY" });
	}

	//Exp limpiar imagenes prev

	try {
		if (existance.img) {
			const imgNameArr = existance.img.split("/");
			const imgName = imgNameArr[imgNameArr.length - 1];
			const [publicId] = imgName.split(".");
			cloudinary.uploader.destroy(publicId);
		}
	} catch (err) {}
	const { secure_url } = await cloudinary.uploader.upload(
		req.files.file.tempFilePath
	);
	existance.img = secure_url;
	await existance.save();
	res.json({
		existance,
	});
};

const getImg = async (req, res = response) => {
	const { collection, id } = req.params;
	switch (collection) {
		case "users":
			model = User;
			break;
		case "products":
			model = Product;
			break;
		default:
			return res.status(500).json({ msg: "ADD CATEGORY" });
	}

	const existance = await model.findById(id);
	if (!existance) {
		return res.status(400).json({ msg: "ID DOES NOT EXIST IN CATEGORY" });
	}
	try {
		if (existance.img) {
			const imgPath = path.join(
				__dirname,
				"../uploads",
				collection,
				existance.img
			);
			if (fs.existsSync(imgPath)) {
				return res.sendFile(imgPath);
			}
		}
	} catch (err) {}
	const placeholder = path.join(__dirname, "../assets", "placeholder.gif");
	res.sendFile(placeholder);
};

module.exports = {
	loadFile,
	uploadImgCloud,
	getImg,
};

// const uploadImg = async (req, res = response) => {
// 	const { collection, id } = req.params;
// 	let model;
// 	switch (collection) {
// 		case "users":
// 			model = User;
// 			break;
// 		case "products":
// 			model = Product;
// 			break;
// 		default:
// 			return res.status(500).json({ msg: "ADD CATEGORY" });
// 	}

// 	const existance = await model.findById(id);
// 	if (!existance) {
// 		return res.status(400).json({ msg: "ID DOES NOT EXIST IN CATEGORY" });
// 	}

// 	//Exp limpiar imagenes prev

// 	try {
// 		if (existance.img) {
// 			const imgPath = path.join(
// 				__dirname,
// 				"../uploads",
// 				collection,
// 				existance.img
// 			);
// 			if (fs.existsSync(imgPath)) {
// 				fs.unlinkSync(imgPath);
// 			}
// 		}
// 	} catch (err) {}

// 	existance.img = await uploadFile(req.files, undefined, collection);
// 	await existance.save();
// 	res.json({
// 		existance,
// 	});
// };
