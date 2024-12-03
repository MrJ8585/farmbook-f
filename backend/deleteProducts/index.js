const { getDbConnection } = require("../db");

module.exports = async function (context, req) {
	const { productoId } = req.params;

	if (!productoId) {
		context.res = {
			status: 400,
			body: {
				message: "El parámetro 'productoId' es obligatorio.",
			},
		};
		return;
	}

	try {
		const pool = await getDbConnection();
		const result = await pool.request().input("ProductoID", productoId)
			.query(`
        DELETE FROM Productos
        WHERE ProductoID = @ProductoID;
      `);

		if (result.rowsAffected[0] === 0) {
			context.res = {
				status: 404,
				body: { message: "Producto no encontrado." },
			};
			return;
		}

		context.res = {
			status: 200,
			body: {
				message: "Producto eliminado exitosamente.",
			},
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: {
				message: "Error al eliminar el producto.",
				error: error.message,
			},
		};
	}
};
