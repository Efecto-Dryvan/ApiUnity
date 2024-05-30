import express from 'express';
import { checkAdminToken } from '../services/authService.js';
import { createObjeto, deleteObjetoById, getObjetoById, getObjetos } from '../controllers/objectController.js';

const router = express.Router();

// Ruta para crear un nuevo objeto (solo para administrador)
router.post('/create', checkAdminToken, createObjeto);

// Rutas públicas para obtener la lista de objetos y obtener un objeto por su ID
router.get('/list', getObjetos);
router.get('/:id', getObjetoById);

// Ruta para eliminar un objeto por su ID (solo para administrador)
router.delete('/:id', deleteObjetoById);

export default router;