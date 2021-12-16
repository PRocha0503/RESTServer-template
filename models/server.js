//Exp: esto es una forma de usar exprees basado en clases
const express = require("express");
//Exp cors es para solo autorizar que alguans paginas peudan llamar el servidor, en chrome es obligatorio tener CORS
const cors = require("cors");
//Exp para carga de archvios
const fileUpload = require("express-fileupload");

//Exp donde esta la configuracion de mongo
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			auth: "/api/auth",
			categories: "/api/categories",
			products: "/api/products",
			users: "/api/user",
			search: "/api/search",
			uploads: "/api/uploads",
		};

		//Conectar a DB
		this.connectDB();
		//Middleware
		this.middlewares();
		//Routas de la aplicación
		this.routes();
	}
	async connectDB() {
		await dbConnection();
	}
	middlewares() {
		//CORS
		this.app.use(cors());
		//Lectura y Parseo del body
		this.app.use(express.json());
		// Directorio publico
		this.app.use(express.static("public"));
		//Exp manjear carga de archivos
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}
	routes() {
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.categories, require("../routes/categories"));
		this.app.use(this.paths.products, require("../routes/products"));
		this.app.use(this.paths.users, require("../routes/user"));
		this.app.use(this.paths.search, require("../routes/search"));
		this.app.use(this.paths.uploads, require("../routes/uploads"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto ", this.port);
		});
	}
}

module.exports = Server;
