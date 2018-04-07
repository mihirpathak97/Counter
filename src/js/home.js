var firebase = require('./js/firebase')

const {remote} = require('electron')
const path = require('path')
const url = require('url')

// Get DB Instance from FireBase
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  // If user is logged in
  if (user) {
    console.log(user);
    // Set username
    $('#display-name').text(user.displayName);
    $('#devices').text('');

    // Set userId to onClick
    document.getElementById('newCounterItemSubmit').setAttribute('onclick', 'addNewItem("' + user.uid + '")');

    // Retrieve existing data
    database.ref().on('value', function (snapshot) {
      $('.box').eq(0).html('');
      $.each(snapshot.val()['user-data'][user.uid], function (index, value) {
        console.log(index + ' - ' + value.value);

        plus = parseInt(value.value) + 1;
        minus = parseInt(value.value) - 1;

        $('.box').eq(0).append(
          `<div class="item" `+ 'id="'+ 'item-' + index +'"' +`>
            <div class="count-wrapper">
              <h1 class="count">` + value.value + `</h1>
            </div>
            <h2 class="name">` + index + `</h2>
            <div class="buttons">
              <div class="button-wrapper">
                <button type="button" onclick="` + 'writeUserData(\''+ user.uid +'\', \'' + index + '\', \'' + plus + `\')" name="button">+</button>
              </div>
              <div class="button-wrapper">
                <button type="button" onclick="` + 'writeUserData(\''+ user.uid +'\', \'' + index + '\', \'' + minus + `\')" name="button">-</button>
              </div>
            </div>
          </div>`
        );
      });
    });

  }

  // If not user is logged in

  else {
    remote.getCurrentWindow().loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }))
  }
});


function signOut() {
  firebase.auth().signOut().then(function() {
    remote.getCurrentWindow().loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }));
  }).catch(function(error) {
    // TODO: Implement signout modal
    console.log('Sign Out Error!');
  });
}

function writeUserData(userId, token, value) {
  firebase.database().ref('user-data/' + userId + '/' + token).set({
    value: value
  });
  // remote.getCurrentWindow().loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, 'home.html'),
  //     protocol: 'file:',
  //     slashes: true
  //   }))
}

$('.add-button-wrapper').click(function () {
  $('.w3-modal').show();
});

function addNewItem(userId) {
  writeUserData(userId, $('#newCounterItem').val(), 0);
  $('.w3-modal').hide();
}
