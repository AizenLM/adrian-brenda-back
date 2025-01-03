import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/router.js";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT_SERVER = 3000;
const MONGO_URI = process.env.MONGO_URI;

// Configuración de CORS: Permitir todos los métodos en local y solo GET en producción
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://adrianbrenda.netlify.app' // Dominio de producción
      : 'http://localhost:5173', // Permitir localhost en desarrollo
  methods:
    process.env.NODE_ENV === 'production'
      ? ['GET', 'PATCH'] // Métodos permitidos en producción
      : ['GET', 'PATCH'], // Métodos permitidos en desarrollo
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conexión exitosa a MongoDB Atlas"))
  .catch((error) => console.log(`ERROR en la conexión a la base de datos: ${error}`));

app.use(cors(corsOptions)); // Usar las opciones de CORS aquí
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT_SERVER, () => {
    console.log(`Servidor corriendo correctamente en: http://localhost:${PORT_SERVER}`);
});

app.use('/', router);
