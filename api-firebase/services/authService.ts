import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
  } from 'firebase/firestore';
  import dotenv from 'dotenv';
  import { Request, Response, NextFunction } from 'express';
  import { VercelRequest, VercelResponse } from "@vercel/node";
import firebase from '../config/firebase';
  
  dotenv.config();
  
  const db = getFirestore(firebase);
  
  // Middleware para verificar el token de administrador
  export const checkAdminToken = (req: VercelRequest, res: VercelResponse, next: NextFunction): void => {
    const adminToken = process.env.ADMIN_TOKEN;
    const token = req.body.token;
  
    if (!token) {
      res.status(400).send('Token is required');
      return;
    }
  
    if (token === adminToken) {
      next(); // Si el token coincide, permite el acceso a la ruta
    } else {
      res.status(403).send('Forbidden');
    }
  };
  
  export const getUserIdByToken = async (token: string): Promise<number | null> => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('token', '==', token));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        return null;
      } else {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.data().id;
        return userId;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const validateTokenAndGetUserId = async (req: VercelRequest, res: VercelResponse): Promise<number | null> => {
    const token = req.body.token;
    if (!token) {
      res.status(400).send('Token is required');
      return null;
    }
  
    const userId = await getUserIdByToken(token);
    if (!userId) {
      res.status(404).send('User not found');
      return null;
    }
  
    return userId;
  };