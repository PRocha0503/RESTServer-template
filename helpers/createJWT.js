const jwt = require("jsonwebtoken");

const createJWT = (uid = " ") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: "1y",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	createJWT,
};
