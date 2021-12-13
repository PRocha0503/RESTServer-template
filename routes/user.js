const { Router } = require("express");
//Exp middleware para checar condicion
const { check } = require("express-validator");
//Exp para revisar errores de todos loc checks
const { fieldValidation, validateJWT, isRole } = require("../middlewares");

const { isValidRole, isNewEmail, idExits } = require("../helpers/dbValidators");
const {
	usuariosGet,
	usuariosPut,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
} = require("../controllers/user");

const router = Router();

//Exp manda info en json
router.get("/", usuariosGet);
//Exp ":" es para poner argumentos en el url, ya la ruta sin nada despues no funciona
router.put(
	"/:id",
	[
		check("id", "Not a valid ID").isMongoId(),
		check("id").custom(idExits),
		check("role").custom(isValidRole),
		fieldValidation,
	],
	usuariosPut
);
//Exp poner data
router.post(
	"/",
	[
		//Exp todos los checks que tiene que pasar
		check("name", "Name is mandatory").not().isEmpty(),
		check("email", "Email is mandatory").not().isEmpty(),
		check("email", "Not an email").isEmail(),
		check("email").custom(isNewEmail),
		check("password", "Password is mandatory").not().isEmpty(),
		check("password", "Password must be 6 chars long").isLength({ min: 6 }),
		check("role", "Role is mandatory").not().isEmpty(),
		//check("role", "Role not in roles").isIn(["ADMIN_ROLE", "USER_ROL"]),
		check("role").custom(isValidRole),
		fieldValidation,
	],
	usuariosPost
);
//Exp borrar data
router.delete(
	"/:id",
	[
		validateJWT,
		//isAdmin,
		isRole("ADMIN_ROLE", "SALES_ROLE"),
		check("id", "Not a valid ID").isMongoId(),
		check("id").custom(idExits),
		fieldValidation,
	],
	usuariosDelete
);
//Exp cambiar data
router.patch("/", usuariosPatch);
module.exports = router;
