// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzGlw8piws25L7qAVjdQ-C44KAdzOgsd4",
    authDomain: "animeverse-7ee43.firebaseapp.com",
    databaseURL: "https://animeverse-7ee43-default-rtdb.firebaseio.com/",
    projectId: "animeverse-7ee43",
    storageBucket: "animeverse-7ee43.firebasestorage.app",
    messagingSenderId: "352755227541",
    appId: "1:352755227541:web:5704d4aa0ee8caaa20f49c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const database = getDatabase(app);