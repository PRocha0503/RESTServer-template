const { Router } = require("express");
//Exp middleware para checar condicion
const { check } = require("express-validator");
//Exp para revisar errores de todos loc checks
const {
	fieldValidation,
	validateJWT,
	isAdmin,
	isValidProduct,
} = require("../middlewares");

const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products");

const router = Router();

router.get("/", getProducts);
router.get(
	"/:id",
	[check("id", "Not a valid ID").isMongoId(), isValidProduct, fieldValidation],
	getProduct
);
router.post(
	"/",
	[
		validateJWT,
		check("name", "Name is mandatory").not().isEmpty(),
		check("category", "Category is mandatory").not().isEmpty(),
		fieldValidation,
	],
	createProduct
);
router.put(
	"/:id",
	[
		validateJWT,
		check("id", "Not a valid ID").isMongoId(),
		isValidProduct,
		check("name", "Name is mandatory").not().isEmpty(),
		fieldValidation,
	],
	updateProduct
);
router.delete(
	"/:id",
	[
		validateJWT,
		check("id", "Not a valid ID").isMongoId(),
		isValidProduct,
		isAdmin,
		fieldValidation,
	],
	deleteProduct
);

module.exports = router;
