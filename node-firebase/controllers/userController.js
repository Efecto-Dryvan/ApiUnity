import firebase from '../firebase.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import crypto from 'crypto';

const db = getFirestore(firebase);

const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

export const createUser = async (req, res, next) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('id', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    let newId = 1;
    if (!querySnapshot.empty) {
      const highestIdDoc = querySnapshot.docs[0];
      newId = highestIdDoc.data().id + 1;
    }

    const token = generateToken();
    const userData = { id: newId, token };
    await addDoc(usersRef, userData);
    res.status(200).send({ message: 'User created successfully', id: newId, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const deleteUser = async (req, res) => {
  try {
      const usuarioId = parseInt(req.params.id);

      if (isNaN(usuarioId)) {
          return res.status(400).send('ID del usuario debe ser un número');
      }

      const usuarioRef = collection(db, 'users');
      const q = query(usuarioRef, where('id', '==', usuarioId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
          return res.status(404).send('Usuario no encontrado');
      }

      // Eliminar el objeto obtenido
      const usuarioDoc = querySnapshot.docs[0];
      await deleteDoc(usuarioDoc.ref);

      res.status(200).send('User deleted successfully');
  } catch (error) {
      console.error('Error al eliminar al usuario:', error);
      res.status(500).send('Error interno del usuario');
  }
};