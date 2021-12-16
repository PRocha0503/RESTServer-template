const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
	files,
	validExtensions = ["jpg", "png", "gif", "jpeg"],
	folder = ""
) => {
	return new Promise((resolve, reject) => {
		const { file } = files;
		const cropedName = file.name.split(".");
		const extension = cropedName[cropedName.length - 1];

		//Exp valdiar extencion
		if (!validExtensions.includes(extension)) {
			return reject("Invalid file type.");
		}
		const tempName = uuidv4() + "." + extension;
		const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

		file.mv(uploadPath, (err) => {
			if (err) {
				return reject(err);
			}
			resolve(tempName);
		});
	});
};

module.exports = {
	uploadFile,
};
