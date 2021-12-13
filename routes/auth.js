const { Router } = require("express");
//Exp middleware para checar condicion
const { check } = require("express-validator");
const { fieldValidation } = require("../middlewares/fieldValidation");

const { login } = require("../controllers/auth");
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

module.exports = router;
