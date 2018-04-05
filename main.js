const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1920, height: 1080, icon: path.join(__dirname, 'assets/icons/mac.icns')})
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  app.on('ready', createWindow)
