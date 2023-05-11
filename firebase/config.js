import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDGNx_vBD4JD-PgqhzTw3XVB_I9FxRMwQI",
  authDomain: "rn-social-a1000.firebaseapp.com",
  projectId: "rn-social-a1000",
  storageBucket: "rn-social-a1000.appspot.com",
  messagingSenderId: "1085612005985",
  appId: "1:1085612005985:web:15d979a93a105b55b0e820",
  measurementId: "G-GT7570BZWW"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);