import Guest from "../models/guestModel.js";

// Crear invitado
const createGuest = async (req, res, next) => {
  console.log(req.body);
  const { lastName, rsvp, numGuest } = req.body;
  try {
    const newGuest = new Guest({
      lastName,
      rsvp,
      numGuest,
    });
    await newGuest.save();
    res.status(201).json({
      success: true,
      message: "INVITADO CREADO EXITOSAMENTE",
      guest: newGuest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ERROR AL CREAR EL INVITADO",
      error: error.message,
    });
  }
};

// Obtener todos los invitados
const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json({
      success: true,
      guests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ERROR AL OBTENER LOS INVITADOS",
      error: error.message,
    });
  }
};

// Obtener invitado por clave
const getGuestByClave = async (req, res) => {
  const { clave } = req.params;

  try {
    const guest = await Guest.findOne({ clave });

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Invitado no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      guest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el invitado",
      error: error.message,
    });
  }
};

// Actualizar datos del invitado
const updateGuest = async (req, res) => {
  const { clave } = req.params;
  const { lastName, rsvp, numGuest } = req.body;

  try {
    const updatedGuest = await Guest.findOneAndUpdate(
      { clave },
      { lastName, rsvp, numGuest },
      { new: true, runValidators: true }
    );

    if (!updatedGuest) {
      return res.status(404).json({
        success: false,
        message: "Invitado no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Datos del invitado actualizados correctamente",
      guest: updatedGuest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar los datos del invitado",
      error: error.message,
    });
  }
};

// Eliminar invitado
const deleteGuest = async (req, res) => {
  const { clave } = req.params;

  try {
    const deletedGuest = await Guest.findOneAndDelete({ clave });

    if (!deletedGuest) {
      return res.status(404).json({
        success: false,
        message: "Invitado no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invitado eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al eliminar el invitado",
      error: error.message,
    });
  }
};

// Confirmar asistencia (RSVP)
const confirmRSVP = async (req, res) => {
  const { clave } = req.params;

  if (!clave) {
    return res.status(400).json({
      success: false,
      message: "Clave no proporcionada",
    });
  }

  try {
    const guest = await Guest.findOneAndUpdate(
      { clave },
      { rsvp: true, fechaRSVP: new Date() },
      { new: true, runValidators: true }
    );

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Invitado no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Asistencia confirmada exitosamente",
      guest: {
        firstName: guest.firstName,
        lastName: guest.lastName,
        rsvp: guest.rsvp,
        fechaRSVP: guest.fechaRSVP,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al confirmar la asistencia",
      error: error.message,
    });
  }
};

export {
  createGuest,
  getAllGuests,
  getGuestByClave,
  updateGuest,
  deleteGuest,
  confirmRSVP,
};
