var firebase = require('./js/firebase')

const {remote} = require('electron')
const path = require('path')
const url = require('url')

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#display-name').text(user.email);
    $('#devices').text('');
  } else {
    remote.getCurrentWindow().loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
  }
});
