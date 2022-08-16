import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcqUFXdvcpxMdoprD18ssFarNUZaJwtr4",
  authDomain: "movie-app-26981.firebaseapp.com",
  databaseURL: "https://movie-app-26981-default-rtdb.firebaseio.com",
  projectId: "movie-app-26981",
  storageBucket: "movie-app-26981.appspot.com",
  messagingSenderId: "76230496021",
  appId: "1:76230496021:web:6ae6a9ea9fb8c83d32a31c",
  measurementId: "G-DTQ946FVZP"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;