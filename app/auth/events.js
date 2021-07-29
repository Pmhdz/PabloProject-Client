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
  event.preventDefault()
  const boardedClicked = $(event.target)
  const index = $(boardedClicked).data('cellIndex')
  store.gameIndex = index
  store.currentPlayer = currentPlayer
  if (store.game.over) return
  if (boardedClicked.text()) return
  store.game.cells[index] = currentPlayer
  boardedClicked.text(currentPlayer)
  currentPlayer = currentPlayer === 'o' ? 'x' : 'o'
  store.game.over = wonGame()
  api.updateGame()
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
}
const wonGame = function () {
  const cells = store.game.cells
  // 3 in a row
  // top row
  // 0,1,2
  const one = cells[0]
  const two = cells[1]
  const three = cells[2]
  const four = cells[3]
  const five = cells[4]
  const six = cells[5]
  const seven = cells[6]
  const eight = cells[7]
  const nine = cells[8]
  // horizontal
  if (one === two && one === three && one !== '') {
    store.winner = currentPlayer
    return true
  }

  if (four === five && four === six && four !== '') {
    store.winner = currentPlayer
    return true
  }

  if (seven === eight && seven === nine && seven !== '') {
    store.winner = currentPlayer
    return true
  }
  // verticals
  if (one === four && one === seven && one !== '') {
    store.winner = currentPlayer
    return true
  }

  if (two === five && two === eight && two !== '') {
    store.winner = currentPlayer
    return true
  }
  if (three === six && three === nine && three !== '') {
    store.winner = currentPlayer
    return true
  }
  // diagonals
  if (one === four && one === nine && one !== '') {
    store.winner = currentPlayer
    return true
  }
  if (three === five && three === seven && three !== '') {
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
