const { getDbConnection } = require("../db");

module.exports = async function (context, req) {
	const { userId } = req.params;

	try {
		const pool = await getDbConnection();
		const farm = await pool.request().input("usuarioID", userId).query(`
      SELECT 
        g.*,
        (
          SELECT 
              u.UsuarioID AS id,
              u.Correo AS correo,
              u.Nombre AS nombre,
              u.Apellido AS apellido,
              u.Edad AS edad,
              u.TipoClienteID AS tipoClienteID
          FROM Usuario u
          WHERE u.UsuarioID = @usuarioID
          FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS usuario,
        (
          SELECT 
              p.Nombre AS name,
              p.Descripcion AS descripcion,
              p.Imagen AS image
          FROM Productos p
          WHERE p.GranjaID = g.GranjaID
          FOR JSON PATH
        ) AS productos,
        (
          SELECT 
              ps.PracticaID AS id,
              ps.Nombre AS nombre,
              ps.Descripcion AS descripcion,
              ps.Icon AS icon
          FROM Granja_Practicas gp
          INNER JOIN PracticasSustentables ps ON ps.PracticaID = gp.PracticaID
          WHERE gp.GranjaID = g.GranjaID
          FOR JSON PATH
        ) AS practicas_sustentables,
        (
          SELECT 
              b.BadgeID AS id,
              b.Nombre AS nombre,
              b.Descripcion AS descripcion,
              b.Imagen AS imagen
          FROM Badge_Granja bg
          INNER JOIN Badge b ON b.BadgeID = bg.BadgeID
          WHERE bg.GranjaID = g.GranjaID
          FOR JSON PATH
        ) AS badges
      FROM Granja g
      WHERE UsuarioID = @usuarioID
    `);

		if (farm.recordset.length === 0) {
			context.res = {
				status: 404,
				body: {
					message:
						"No se encontró una granja asociada a este usuario",
				},
			};
			return;
		}

		context.res = {
			status: 200,
			body: farm.recordset[0],
		};
	} catch (error) {
		context.log.error(error);
		context.res = {
			status: 500,
			body: { message: "Error al obtener la granja" },
		};
	}
};
