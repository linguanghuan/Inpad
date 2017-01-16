const { app, BrowserWindow } = require('electron')
const path = require('path')
const Positioner = require('electron-positioner')

const DEV = process.env.NODE_ENV === 'development'

const preferencesWindow = new BrowserWindow({
  width: 640,
  height: 480,
  show: false,
  webPreferences: {
    blinkFeatures: 'OverlayScrollbars'
  }
})
const positioner = new Positioner(preferencesWindow)

preferencesWindow.loadURL('file://' + path.join(__dirname, DEV
  ? '/preferences.html'
  : '/preferences.production.html'
))

// preferencesWindow.loadURL('file://' + path.join(__dirname, 'test2.html'))

// preferencesWindow.webContents.on('new-window', e => {
//   e.preventDefault()
// })

preferencesWindow.on('close', e => {
  e.preventDefault()
  preferencesWindow.hide()
})

preferencesWindow.on('hide', e => {
  preferencesWindow.setSize(640, 480)
  positioner.move('center')
})

preferencesWindow.on('blur', e => {
  preferencesWindow.hide()
})

app.on('before-quit', e => {
  preferencesWindow.removeAllListeners()
})

module.exports = preferencesWindow
