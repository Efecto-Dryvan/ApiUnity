import express, { json } from 'express';
import { createUser, deleteUser } from '../controllers/userController';
import { checkAdminToken } from '../services/authService';
import { createGame, deleteGameById, getGames, getGameByUser } from '../controllers/gameController';
import { createObjeto, deleteObjetoById, getObjetoById, getObjetos } from '../controllers/objectController';

import cors from 'cors';

const app = express();

const version = "1.0.0";

app.use(cors());
app.use(json()); // Middleware para parsear JSON en el cuerpo de la solicitud

app.get('/', (req, res) => {
    res.send('Hello from Firebase API!');
});

app.get('/api/version', (req, res) => {
    res.json({ version });
});


app.post('/user/create', (req, res) => {
    return createUser(req, res);
});
app.delete('/user/delete', (req, res) => {
    return deleteUser(req, res);
});

app.post('/game/create', (req, res) => {
    return createGame(req, res);
});
app.get('/game/list',checkAdminToken, (req, res) => {
    return getGames(req, res);
});
app.get('/game/list/user', (req, res) => {
    return getGameByUser(req, res);
});
app.delete('/game/delete', (req, res) => {
    return deleteGameById(req, res);
});

// Ruta para crear un nuevo objeto (solo para administrador)
app.post('/object/create',checkAdminToken, (req, res) => {
    return createObjeto(req, res);
});

// Rutas públicas para obtener la lista de objetos y obtener un objeto por su ID
app.get('/object/list', (req, res) => {
    return getObjetos(req, res);
});
app.get('/object/view', (req, res) => {
    return getObjetoById(req, res);
});

// Ruta para eliminar un objeto por su ID (solo para administrador)
app.delete('/object/delete', (req, res) => {
    return deleteObjetoById(req, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
