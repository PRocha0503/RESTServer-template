const { Router } = require("express");
//Exp middleware para checar condicion
const { check } = require("express-validator");
const { fieldValidation } = require("../middlewares/fieldValidation");
const { allowedCollections } = require("../helpers");
const { loadFile, uploadImgCloud, getImg } = require("../controllers/uploads");
const { validImage } = require("../middlewares");

const router = Router();

router.post("/", loadFile);

router.put(
	"/:collection/:id",
	[
		check("id", "Invalid ID").isMongoId(),
		check("collection").custom((c) =>
			allowedCollections(c, ["users", "products"])
		),
		validImage,
		fieldValidation,
	],
	uploadImgCloud
);
router.get(
	"/:collection/:id",
	[
		check("id", "Invalid ID").isMongoId(),
		check("collection").custom((c) =>
			allowedCollections(c, ["users", "products"])
		),
		fieldValidation,
	],
	getImg
);

module.exports = router;
