import { VercelRequest, VercelResponse } from "@vercel/node";
import firebase from '../config/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  deleteDoc,
} from 'firebase/firestore';
import Objecto from '../models/objectModel.js';

const db = getFirestore(firebase);

export const createObjeto = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { nombre, tipo, sprite, descripcion, stats } = req.body;

    if (!nombre || !tipo || !sprite || !descripcion || !stats) {
      return res.status(400).send('Todos los campos son requeridos');
    }

    const objetosRef = collection(db, 'objetos');
    const q = query(objetosRef, orderBy('id', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    let newId = 1;
    if (!querySnapshot.empty) {
      const highestIdDoc = querySnapshot.docs[0];
      newId = highestIdDoc.data().id + 1;
    }

    const nuevoObjeto = new Objecto(newId, nombre, tipo, sprite, descripcion, stats);

    await addDoc(objetosRef, { ...nuevoObjeto });

    res.status(201).json({ message: 'Objeto creado exitosamente', id: newId });
  } catch (error) {
    console.error('Error al crear el objeto:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getObjetos = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const objetosRef = collection(db, 'objetos');
    const objetosSnapshot = await getDocs(objetosRef);

    const objetos: Objecto[] = [];

    objetosSnapshot.forEach((doc) => {
      objetos.push(doc.data() as Objecto);
    });

    res.status(200).json(objetos);
  } catch (error) {
    console.error('Error al obtener la lista de objetos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getObjetoById = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { id } = req.query;

    const objetoId = parseInt(id as string, 10);

    if (isNaN(objetoId)) {
      return res.status(400).send('ID del objeto debe ser un número');
    }

    const objetosRef = collection(db, 'objetos');
    const q = query(objetosRef, where('id', '==', objetoId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).send('Objeto no encontrado');
    }

    const objetoData = querySnapshot.docs[0].data();
    res.status(200).json(objetoData);
  } catch (error) {
    console.error('Error al obtener el objeto:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const deleteObjetoById = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { id } = req.query;

    const objetoId = parseInt(id as string, 10);

    if (isNaN(objetoId)) {
      return res.status(400).send('ID del objeto debe ser un número');
    }

    const objetosRef = collection(db, 'objetos');
    const q = query(objetosRef, where('id', '==', objetoId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).send('Objeto no encontrado');
    }

    const objetoDoc = querySnapshot.docs[0];
    await deleteDoc(objetoDoc.ref);

    res.status(200).send('Objeto eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el objeto:', error);
    res.status(500).send('Error interno del servidor');
  }
};