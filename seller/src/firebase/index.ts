// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAd_SV-KZ-9JWQzO0PE4xvoyaRcAvjqCk",
  authDomain: "indovskagro.firebaseapp.com",
  projectId: "indovskagro",
  storageBucket: "indovskagro.appspot.com",
  messagingSenderId: "113170140837",
  appId: "1:113170140837:web:2549f850009c1e28d2474c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
