const { Router } = require("express");
//Exp middleware para checar condicion
const { check } = require("express-validator");
const { fieldValidation } = require("../middlewares/fieldValidation");

const { login, googleSingIn } = require("../controllers/auth");
const { emailExits, userActive } = require("../helpers/dbValidators");

const router = Router();
router.post(
	"/login",
	[
		check("email", "Email is mandatory").isEmail(),
		check("password", "Password is mandatory").not().isEmpty(),
		check("email").custom(emailExits),
		check("email").custom(userActive),
		fieldValidation,
	],
	login
);
router.post(
	"/google",
	[
		check("id_token", "GOOGLE token is mandatory").not().isEmpty(),
		fieldValidation,
	],
	googleSingIn
);

module.exports = router;
