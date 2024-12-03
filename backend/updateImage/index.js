const { BlobServiceClient } = require("@azure/storage-blob");
const sql = require("mssql");
const multiparty = require("multiparty");

// Variables de configuración
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);
const containerName = process.env.CONTAINER_NAME;
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Usa `true` para Azure SQL
    trustServerCertificate: false,
  },
};

// Función principal
module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    context.res = {
      status: 400,
      body: { error: "Se requiere el parámetro 'id'." },
    };
    return;
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err || !files.image) {
      context.res = {
        status: 400,
        body: {
          error: "No se proporcionó una imagen o hubo un error al procesarla.",
        },
      };
      return;
    }

    const file = files.image[0];
    try {
      // Subir imagen al blob storage
      const blobName = `${Date.now()}-${file.originalFilename}`;
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const fileBuffer = require("fs").readFileSync(file.path);

      await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: file.headers["content-type"] },
      });

      const imageUrl = blockBlobClient.url;

      // Conexión a la base de datos y actualización del registro
      const pool = await sql.connect(sqlConfig);
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("imagen", sql.NVarChar, imageUrl).query(`
          UPDATE Granja 
          SET Imagen = @imagen
          WHERE GranjaID = @id;
        `);

      context.res = {
        status: 200,
        body: {
          message: "Imagen actualizada exitosamente",
          imageUrl,
        },
      };
    } catch (error) {
      context.log.error(error);
      context.res = {
        status: 500,
        body: {
          error: "Error al subir la imagen o actualizar la base de datos.",
        },
      };
    }
  });
};
