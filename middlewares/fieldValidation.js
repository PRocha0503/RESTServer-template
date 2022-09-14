//Exp middleware para cahcer error en request
const { validationResult } = require("express-validator");
//Exp Checar errores que reporto el middleware
const fieldValidation = (req, res, next) => {
	const errors = validationResult(req, res);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	// Exp como es middleware se pone nex para seguir con el siguiente o ir al controlador
	next();
};
module.exports = {
	fieldValidation,
};
