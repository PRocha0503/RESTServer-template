//Exp poner las importaciones juntas en un lugar

const fieldValidation = require("../middlewares/fieldValidation");
const validateJWT = require("../middlewares/validateJWT");
const validateRoles = require("../middlewares/validateRoles");
const validateCategory = require("./validateCategory");
const validateProduct = require("./validateProduct");
module.exports = {
	...fieldValidation,
	...validateJWT,
	...validateRoles,
	...validateCategory,
	...validateProduct,
};
