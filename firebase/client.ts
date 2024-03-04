import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";
// import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCM07p8cMQLAScnyuWw3A1t-eyILsYi0fA",
  authDomain: "sharevalues-3a252.firebaseapp.com",
  projectId: "sharevalues-3a252",
  storageBucket: "sharevalues-3a252.appspot.com",
  messagingSenderId: "1011933506683",
  appId: "1:1011933506683:web:cec1c7a4b4ef8a85e986de",
  measurementId: "G-BPZSY9P2L7",
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

// export const analytics = getAnalytics();
export const db = getFirestore();
// export const storage = getStorage();
// export const auth = getAuth();
// export const funcions = getFunctions();
