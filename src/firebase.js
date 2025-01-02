import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"; // Corrected here
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDYNC7Lw5jSEIFiwcSIuwKYgPTF9VzR1bk",
  authDomain: "netflix-clone-c70dc.firebaseapp.com",
  projectId: "netflix-clone-c70dc",
  storageBucket: "netflix-clone-c70dc.firebasestorage.app",
  messagingSenderId: "260429335722",
  appId: "1:260429335722:web:976aff3155dcb3f6ca54d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // Corrected here

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout };
