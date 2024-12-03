const { getDbConnection } = require("../db");

module.exports = async function (context, req) {
	const { id } = req.params;
	const { nombre, ubicacion, descripcion } = req.body;

	if (!id || !nombre || !ubicacion || !descripcion) {
		context.res = {
			status: 400,
			body: {
				message:
					"Faltan parámetros necesarios (id, nombre, ubicacion, descripcion).",
			},
		};
		return;
	}

	try {
		const pool = await getDbConnection();
		await pool
			.request()
			.input("id", id)
			.input("nombre", nombre)
			.input("ubicacion", ubicacion)
			.input("descripcion", descripcion).query(`
        UPDATE Granja 
        SET Nombre = @nombre, Ubicacion = @ubicacion, Descripcion = @descripcion
        WHERE GranjaID = @id;
      `);

		context.res = {
			status: 200,
			body: {
				message: "Información de la granja actualizada exitosamente",
			},
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: {
				message: "Error al actualizar la información de la granja.",
				error: error.message,
			},
		};
	}
};
