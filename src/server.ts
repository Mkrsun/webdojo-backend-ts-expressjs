import app from "./app";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT ?? 3737;

app.listen(PORT, () => {
  console.log(`Walletin API Up and Running at port ${PORT}`);
});
