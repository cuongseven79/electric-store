// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQeBsnoI92yVIV9CTXtA2xLJVlzO_PRzM',
  authDomain: 'ecommerce-4ff4a.firebaseapp.com',
  projectId: 'ecommerce-4ff4a',
  storageBucket: 'ecommerce-4ff4a.appspot.com',
  messagingSenderId: '1071328933627',
  appId: '1:1071328933627:web:6d70bbbe7ea0627894e25e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
