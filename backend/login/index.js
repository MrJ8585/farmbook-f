const bcrypt = require("bcrypt");
const { getDbConnection } = require("../db");
const jwt = require("jsonwebtoken");

module.exports = async function (context, req) {
	const { correo, contrasena } = req.body;

	try {
		const pool = await getDbConnection();
		const user = await pool
			.request()
			.input("correo", correo)
			.query(`SELECT * FROM Usuario WHERE Correo = @correo`);

		if (user.recordset.length === 0) {
			context.res = {
				status: 400,
				body: { message: "Usuario no encontrado" },
			};
			return;
		}

		const validPassword = await bcrypt.compare(
			contrasena,
			user.recordset[0].Contrasena
		);

		if (!validPassword) {
			context.res = {
				status: 401,
				body: { message: "Contraseña incorrecta" },
			};
			return;
		}

		const token = jwt.sign(
			{ userId: user.recordset[0].UsuarioID },
			"your_secret_key",
			{ expiresIn: "1h" }
		);

		context.res = {
			status: 200,
			body: {
				token,
				user: user.recordset[0],
			},
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: { message: "Error interno del servidor" },
		};
	}
};
