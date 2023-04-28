import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFUvLPiSWgSnDmov4--c9YOruj057QlY0",
  authDomain: "find-it-7ebaa.firebaseapp.com",
  projectId: "find-it-7ebaa",
  storageBucket: "find-it-7ebaa.appspot.com",
  messagingSenderId: "339929855068",
  appId: "1:339929855068:web:ed2609c835e5fde6dc2299",
  measurementId: "G-XQYVGW5HWQ"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
