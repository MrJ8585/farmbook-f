const { getDbConnection } = require("../db");

module.exports = async function (context, req) {
	const { granjaId } = req.params;

	try {
		const pool = await getDbConnection();
		const result = await pool.request().input("GranjaID", granjaId).query(`
      SELECT * FROM Productos WHERE GranjaID = @GranjaID;
    `);

		context.res = {
			status: 200,
			body: result.recordset,
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: { message: "Error al obtener los productos" },
		};
	}
};
