// Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyALo7BnLsz2NLNAUtWnRBI6h7smJu7Wimc",
  authDomain: "sierra-sounds.firebaseapp.com",
  projectId: "sierra-sounds",
  storageBucket: "sierra-sounds.appspot.com",
  messagingSenderId: "526354492794",
  appId: "1:526354492794:web:c2fdc17ad93d3f45cebac3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Sign Up Function
window.signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created!");
  } catch (error) {
    alert(error.message);
  }
}

// Login Function
window.login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in!");
  } catch (error) {
    alert(error.message);
  }
}

// Upload Music
window.uploadMusic = async (title, artist, file) => {
  try {
    const storageRef = ref(storage, 'music/' + file.name);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(db, "songs"), {
      title: title,
      artist: artist,
      url: url
    });
    alert("Music uploaded!");
  } catch (error) {
    alert(error.message);
  }
}

// Search Music
window.searchMusic = async (keyword) => {
  const q = query(collection(db, "songs"), where("title", "==", keyword));
  const results = await getDocs(q);
  results.forEach((doc) => {
    console.log(doc.data());
  });
}
