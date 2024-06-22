require("dotenv").config();
const knex = require("knex");

const dbConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306, // Usar el puerto de la variable de entorno
  },
};

const dbName = process.env.DB_NAME;

// Crear una conexión sin especificar la base de datos
const knexWithoutDb = knex({
  ...dbConfig,
  connection: {
    ...dbConfig.connection,
    database: null,
  },
});

knexWithoutDb
  .raw(`CREATE DATABASE IF NOT EXISTS ??`, dbName)
  .then(() => {
    console.log(`Base de datos '${dbName}' creada con éxito.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error al crear la base de datos:", error);
    process.exit(1);
  })
  .finally(() => {
    knexWithoutDb.destroy();
  });
