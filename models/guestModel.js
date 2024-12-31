  import mongoose from "mongoose";
  import { v4 as uuidv4 } from 'uuid'; // Importamos la librería uuid

  // Definición del modelo Guest
  const guestSchema = new mongoose.Schema(
    {
      lastName: {
        type: String,
        required: true,
      },
      clave: {
        type: String,
        required: true,
        unique: true, // Aseguramos que la clave sea única
        default: () => uuidv4(), // Generamos la clave automáticamente con uuid
      },  
      rsvp: {
        type: Boolean,
        default: false,
      },
      numGuest: {
        type: Number,
        default: 0,
      },
      fechaRSVP: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true, // Para almacenar automáticamente la fecha de creación y actualización
    }
  );

  // Creamos el modelo Guest con el esquema
  const Guest = mongoose.model("Guest", guestSchema);

  export default Guest;
