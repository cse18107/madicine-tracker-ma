// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEGFPIaYucbuX4N1zVfPrLDI5A_HwKZuY",
  authDomain: "medicine-tracker-46dd4.firebaseapp.com",
  projectId: "medicine-tracker-46dd4",
  storageBucket: "medicine-tracker-46dd4.firebasestorage.app",
  messagingSenderId: "1066205751810",
  appId: "1:1066205751810:web:d7e9e51fb63e37eec4951b",
  measurementId: "G-ET1GMCL6EJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app)