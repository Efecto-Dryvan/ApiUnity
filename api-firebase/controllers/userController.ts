import { VercelRequest, VercelResponse } from "@vercel/node";
import firebase from '../config/firebase';
import {
  getFirestore,
  collection,
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

const generateToken = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export const createUser = async (req: VercelRequest, res: VercelResponse) => {
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
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export const deleteUser = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { id } = req.query;

    const usuarioId = parseInt(id as string, 10);

    if (isNaN(usuarioId)) {
      return res.status(400).send('ID del usuario debe ser un número');
    }

    const usuarioRef = collection(db, 'users');
    const q = query(usuarioRef, where('id', '==', usuarioId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).send('Usuario no encontrado');
    }

    const usuarioDoc = querySnapshot.docs[0];
    await deleteDoc(usuarioDoc.ref);

    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error al eliminar al usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};
