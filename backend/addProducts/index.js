const { getDbConnection } = require("../db");

module.exports = async function (context, req) {
	const { Nombre, Descripcion, Imagen, GranjaID } = req.body;

	if (!Nombre || !Descripcion || !Imagen || !GranjaID) {
		context.res = {
			status: 400,
			body: {
				message:
					"Faltan parámetros necesarios (Nombre, Descripcion, Imagen, GranjaID).",
			},
		};
		return;
	}

	try {
		const pool = await getDbConnection();
		await pool
			.request()
			.input("Nombre", Nombre)
			.input("Descripcion", Descripcion)
			.input("Imagen", Imagen)
			.input("GranjaID", GranjaID).query(`
        INSERT INTO Productos (Nombre, Descripcion, Imagen, GranjaID)
        VALUES (@Nombre, @Descripcion, @Imagen, @GranjaID);
      `);

		context.res = {
			status: 201,
			body: {
				message: "Producto creado exitosamente.",
			},
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: {
				message: "Error al agregar el producto.",
				error: error.message,
			},
		};
	}
};
