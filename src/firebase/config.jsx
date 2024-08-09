// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// export const firebaseConfig = {
//     apiKey: "AIzaSyAv4IfclwZJpEJHQultUAj4aYoqgAOl-J0",
//     authDomain: "corona-6ecfc.firebaseapp.com",
//     projectId: "corona-6ecfc",
//     storageBucket: "corona-6ecfc.appspot.com",
//     messagingSenderId: "760960736372",
//     appId: "1:760960736372:web:9cd2ffacfce1c75f95c521"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = getFirestore(app)
// export const storage = getStorage(app)

// export { addDoc, collection, getDocs };

// export default app
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyAv4IfclwZJpEJHQultUAj4aYoqgAOl-J0",
    authDomain: "corona-6ecfc.firebaseapp.com",
    projectId: "corona-6ecfc",
    storageBucket: "corona-6ecfc.appspot.com",
    messagingSenderId: "760960736372",
    appId: "1:760960736372:web:9cd2ffacfce1c75f95c521"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
    addDoc,
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    ref,
    uploadBytes,
    getDownloadURL
};

export default app;
    