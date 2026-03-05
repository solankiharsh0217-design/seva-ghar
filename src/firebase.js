import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAUfTHbvlAx_WindFvv0U3u8kIZYfHLc34",
  authDomain: "sevaghar.firebaseapp.com",
  projectId: "sevaghar",
  storageBucket: "sevaghar.firebasestorage.app",
  messagingSenderId: "213897952869",
  appId: "1:213897952869:web:56c9f2b530d02d2d8c508c",
  measurementId: "G-DS3RBLBHQB"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
