
const {remote} = require('electron')
const path = require('path')
const url = require('url')

var firebase = require('./js/firebase')

function authCheck() {

  // TODO: Add auth logic here

  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
    console.log(result);
    remote.getCurrentWindow().loadURL(
      url.format({
        pathname: path.join(__dirname, 'home.html'),
        protocol: 'file:',
        slashes: true
      }))
  }).catch(function(error) {
    console.log(error);
    success = false;
  });
}

$('#signup').click(function () {
  $('.w3-modal').show();
});

$('#signupSubmit').click(function () {
  name = $('#signupName').val();
  email = $('#signupEmail').val();
  password = $('#signupPassword').val();

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
    firebase.auth().onAuthStateChanged(function(user) {
      // If user is logged in
      if (user) {
        user.updateProfile({
          displayName: name
        }).then(function() {
          remote.getCurrentWindow().loadURL(
            url.format({
              pathname: path.join(__dirname, 'home.html'),
              protocol: 'file:',
              slashes: true
            }))
        }).catch(function(error) {
          // An error happened.
        });
      }
      else {

      } })
    }).catch(function(error) {
    console.log(error);
  });

});
