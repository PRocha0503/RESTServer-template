const dbValidators = require("./dbValidators");
const createJWT = require("./createJWT");
const googleVerify = require("./googleVerify");
const loadFile = require("./loadFile");
module.exports = {
	...dbValidators,
	...createJWT,
	...googleVerify,
	...loadFile,
};
