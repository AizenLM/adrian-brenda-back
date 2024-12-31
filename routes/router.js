import { Router } from "express";
import { confirmRSVP, createGuest, deleteGuest, getAllGuests, getGuestByClave, updateGuest } from "../controllers/guestController.js";
const router = Router();
// GUEST ROUTER
router.post('/guest', createGuest); // Crear un nuevo invitado
router.get('/guests', getAllGuests); // Obtener todos los invitados
router.get('/guest/:clave', getGuestByClave); // Obtener un invitado por clave
router.put('/guest/:clave', updateGuest); // Actualizar datos de un invitado
router.delete('/guest/:clave', deleteGuest); // Eliminar un invitado
router.patch('/guest/:clave/rsvp', confirmRSVP); // Confirmar asistencia (RSVP)

export default router;