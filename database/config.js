const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN, {});
		console.log("Connected to Mongo");
	} catch (err) {
		console.log(err);
		throw new Error("Couldn't connect to Mongo'");
	}
};

module.exports = {
	dbConnection,
};
