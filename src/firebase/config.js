// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzFqqfsGeeoSxDzSARqZ1hskmTlDRY57g",
  authDomain: "shopily-e5d3d.firebaseapp.com",
  projectId: "shopily-e5d3d",
  storageBucket: "shopily-e5d3d.firebasestorage.app",
  messagingSenderId: "116363967338",
  appId: "1:116363967338:web:09a9a68015cc74a37ac313",
  measurementId: "G-6F0ZGPE1LN"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let analytics = null;

// Initialize Analytics only on the client side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db, analytics };