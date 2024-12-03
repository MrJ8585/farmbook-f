const bcrypt = require("bcrypt");
const { getDbConnection } = require("../db");

module.exports = async function (context, req) {
	const { correo, contrasena, nombre, apellido, edad, tipoCliente } =
		req.body;

	try {
		const hashedPassword = await bcrypt.hash(contrasena, 10);
		const pool = await getDbConnection();

		const tipoClienteID = await pool
			.request()
			.query(
				`SELECT TipoClienteID FROM TipoCliente WHERE TipoCliente = '${tipoCliente}'`
			);

		if (tipoClienteID.recordset.length === 0) {
			context.res = {
				status: 400,
				body: { message: "Tipo de cliente no válido" },
			};
			return;
		}

		const result = await pool
			.request()
			.input("correo", correo)
			.input("contrasena", hashedPassword)
			.input("nombre", nombre)
			.input("apellido", apellido)
			.input("edad", edad)
			.input("tipoClienteID", tipoClienteID.recordset[0].TipoClienteID)
			.query(`
        INSERT INTO Usuario (Correo, Contrasena, Nombre, Apellido, Edad, TipoClienteID) 
        OUTPUT INSERTED.UsuarioID
        VALUES (@correo, @contrasena, @nombre, @apellido, @edad, @tipoClienteID);
      `);

		const usuarioID = result.recordset[0].UsuarioID;

		if (tipoCliente === "Agricultor") {
			await pool
				.request()
				.input("nombre", `${nombre} Granja`)
				.input("ubicacion", "Sin especificar")
				.input("UsuarioID", usuarioID).query(`
          INSERT INTO Granja (Nombre, Ubicacion, UsuarioID) 
          VALUES (@nombre, @ubicacion, @usuarioID);
        `);
		}

		context.res = {
			status: 201,
			body: { message: "Usuario registrado exitosamente" },
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: { error: "Error al registrar usuario" },
		};
	}
};
