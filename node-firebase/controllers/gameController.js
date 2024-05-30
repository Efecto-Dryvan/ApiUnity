import firebase from '../firebase.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import Game from '../models/gameModel.js';
import { validateTokenAndGetUserId } from '../services/authService.js';

const db = getFirestore(firebase);

export const createGame = async (req, res) => {
  try {
    const userId = await validateTokenAndGetUserId(req, res);
    if (!userId) {
      return;
    }

    const { segundos } = req.body;

    if (!segundos) {
      return res.status(400).send('Segundos es requerido');
    }

    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('id', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    let newId = 1;
    if (!querySnapshot.empty) {
      const highestIdDoc = querySnapshot.docs[0];
      newId = highestIdDoc.data().id + 1;
    }

    const fecha = new Date().toISOString();

    const nuevoJuego = new Game(newId, userId, fecha, segundos);

    await addDoc(gamesRef, { ...nuevoJuego });

    res.status(201).json({ message: 'Partida creado exitosamente', id: newId });
  } catch (error) {
    console.error('Error al crear el partida:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getGames = async (req, res) => {
  try {
    const gamesRef = collection(db, 'games');
    const gamesSnapshot = await getDocs(gamesRef);

    const games = [];

    gamesSnapshot.forEach((doc) => {
      games.push(doc.data());
    });

    res.status(200).json(games);
  } catch (error) {
    console.error('Error al obtener la lista de Partidas:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getGameByUser = async (req, res) => {
  try {
    const userId = await validateTokenAndGetUserId(req, res);
    if (!userId) {
      return;
    }

    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).send('Partidas no encontradas');
    }

    const games = querySnapshot.docs.map(doc => doc.data());
    
    res.status(200).json(games);
  } catch (error) {
    console.error('Error al obtener las partidas:', error);
    res.status(500).send('Error interno del servidor');
  }
};


export const deleteGameById = async (req, res) => {
  try {
    const userId = await validateTokenAndGetUserId(req, res);
    if (!userId) {
      return;
    }

    const gameId = parseInt(req.params.id);

    if (isNaN(gameId)) {
      return res.status(400).send('ID de la Partida debe ser un número');
    }

    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where('id', '==', gameId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).send('Partida no encontrada');
    }

    const gameDoc = querySnapshot.docs[0];
    await deleteDoc(gameDoc.ref);

    res.status(200).send('Partida eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la Partida:', error);
    res.status(500).send('Error interno del servidor');
  }
};