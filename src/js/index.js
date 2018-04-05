
const {remote} = require('electron')
const path = require('path')
const url = require('url')

function authCheck() {

  // TODO: Add auth logic here

  remote.getCurrentWindow().loadURL(
    url.format({
      pathname: path.join(__dirname, 'home.html'),
      protocol: 'file:',
      slashes: true
    }))
}
