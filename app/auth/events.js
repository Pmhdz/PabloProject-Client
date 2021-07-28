'use strict'
// const store = require("./store");
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../lib/get-form-fields')
const store = require('../store')
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
  store.gameIndex = $(boardedClicked).data('cell-index')
  console.log(store.game.over)
  store.currentPlayer = currentPlayer
  if (store.game.over) return
  console.log(currentPlayer + 'wins!')
  if (boardedClicked.text()) return
  boardedClicked.text(currentPlayer)
  currentPlayer = currentPlayer === 'o' ? 'x' : 'o'
  store.game.over = wonGame()
  // const move = $(event.target)
  // console.log(container.currentPlayer)
  // ('#update-game').rest()
  // console.log(event.game.Index)
  api.updateGame(currentPlayer)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}
const wonGame = function () {
  const cells = store.game.cells
  if (cells[0] === cells[1] && cells[0] === cells[2] && cells[0] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[1] === cells[4] && cells[1] === cells[7] && cells[1] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[2] === cells[5] && cells[2] === cells[8] && cells[2] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[3] === cells[1] && cells[0] === cells[2] && cells[0] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[0] === cells[3] && cells[0] === cells[6] && cells[0] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[0] === cells[4] && cells[0] === cells[8] && cells[0] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[6] === cells[7] && cells[6] === cells[8] && cells[6] !== '') {
    store.winner = currentPlayer
    return true
  }
  if (cells[2] === cells[4] && cells[2] === cells[6] && cells[2] !== '') {
    store.winner = currentPlayer
    return true
  }

  return false
}
module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame,
  wonGame
}
