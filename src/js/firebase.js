var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCtclMkJpH-kgIyAnPWVfgCUJle-dt_qd0",
  authDomain: "counter-mini-pro.firebaseapp.com",
  databaseURL: "https://counter-mini-pro.firebaseio.com",
  projectId: "counter-mini-pro",
  storageBucket: "",
  messagingSenderId: "360611784873"
};

firebase.initializeApp(config);

module.exports = firebase;
