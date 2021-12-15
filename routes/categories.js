const { Router } = require("express");
//Exp middleware para checar condicion
const { check } = require("express-validator");
//Exp para revisar errores de todos loc checks
const {
	fieldValidation,
	validateJWT,
	isValidCategory,
	isAdmin,
} = require("../middlewares");

const {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/categories");

const router = Router();
//Obtener todas las categorias - publico
router.get("/", getCategories);
//Obtener una  categorias - publico
router.get(
	"/:id",
	[check("id", "Not a valid ID").isMongoId(), isValidCategory, fieldValidation],
	getCategory
);
//Crear categoria - privado con cualquier rol
router.post(
	"/",
	[
		validateJWT,
		check("name", "Name is mandatory").not().isEmpty(),
		fieldValidation,
	],
	createCategory
);
//Actualziar categoria - privado con cualquier rol
router.put(
	"/:id",
	[
		validateJWT,
		check("id", "Not a valid ID").isMongoId(),
		isValidCategory,
		check("name", "Name is mandatory").not().isEmpty(),
		fieldValidation,
	],
	updateCategory
);

//Actualziar categoria - privado solo ADMIN
router.delete(
	"/:id",
	[
		validateJWT,
		check("id", "Not a valid ID").isMongoId(),
		isValidCategory,
		isAdmin,
		fieldValidation,
	],
	deleteCategory
);
module.exports = router;
