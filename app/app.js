// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
// const { updateGame } = require('./auth/api')
const authEvents = require('./auth/events')
// use require without a reference to ensure a file is bundled
// require('./example')
$(() => {
  $('.board').hide()
  $('#update-game').hide()
  $('#sign-out').hide()
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#create-game').on('submit', authEvents.onCreateGame)
  $('.cell').on('click', authEvents.onUpdateGame)
  // $('#update-game').on('submit', authEvents.onUpdateGame)
})
