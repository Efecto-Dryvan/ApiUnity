import express from 'express';
import { createGame, deleteGameById, getGames, getGameByUser } from '../controllers/gameController.js';
import { checkAdminToken } from '../services/authService.js';

const router = express.Router();

router.post('/create', createGame);
router.get('/list', checkAdminToken, getGames);
router.get('/list/user', getGameByUser);
router.delete('/:id', deleteGameById);

export default router;
