'use strict'
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../lib/get-form-fields')
const onSignUp = function (event) {
  event.preventDefault()
  // get info from event and form
  const form = event.target
  console.log(form)
  const data = getFormFields(form)
  console.log(data)
  // make an api call using AJAX
  // handle successful api call with .then
  // handle failed api call with .catch
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  // get info from event and form
  const form = event.target
  // make an api call using AJAX
  // handle successful api call with .then
  // handle failed api call with .catch
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInSuccess)
}
const onSignOut = function (event) {
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}
const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}
// start player then go X and then to O
let currentPlayer = 'x'
const onUpdateGame = (event) => {
  (event).preventDefault()
  console.log('click')
  const boardedClicked = $(event.target)
  if (boardedClicked.text()) return
  boardedClicked.text(currentPlayer)
  currentPlayer = currentPlayer === 'o' ? 'x' : 'o'
  // const move = $(event.target)
  // console.log(container.currentPlayer)
  // ('#update-game').rest()
  console.log(event.game.Index)
  api.updateGame(currentPlayer)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}
module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame
}
