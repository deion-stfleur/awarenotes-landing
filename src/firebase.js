import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1pskHluHneIvgToG9JXyQpNQPVoi_O4U",
  authDomain: "ocr-mobile-8e9f1.firebaseapp.com",
  projectId: "ocr-mobile-8e9f1",
  storageBucket: "ocr-mobile-8e9f1.appspot.com",
  messagingSenderId: "728865880802",
  appId: "1:728865880802:web:d464c01bb76b7559a67cbb",
  measurementId: "G-RH5NT1Y5J7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;