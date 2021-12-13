const isAdmin = (req, res, next) => {
	console.log(req.user.role);
	if (!req.user) {
		return res
			.status(500)
			.json({ msg: "ROLE CANOT BE VERIFED WITHOUT TOKEN VERIFICATION FIRSTs" });
	}
	if (req.user.role !== "ADMIN_ROLE") {
		return res.status(401).json({ msg: "NOT AN ADMIN" });
	}
	next();
};

const isRole = (...roles) => {
	//Exp para regresar un middleare valido pasando argumentos
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(401).json({ msg: "NOT AN ADMIN" });
		}
		next();
	};
};

module.exports = {
	isAdmin,
	isRole,
};
