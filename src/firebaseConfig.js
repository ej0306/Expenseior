import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvxcsEsgKxUpmzz1hx92Uev9kqRn1Vwdk",
  authDomain: "expenseior.firebaseapp.com",
  projectId: "expenseior",
  storageBucket: "expenseior.appspot.com",
  messagingSenderId: "879844893989",
  appId: "1:879844893989:web:216a6c16695bc28ee8e6cc",
  measurementId: "G-32PVYM5BGB"
};


const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);

export { fireDb, app };