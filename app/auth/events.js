'use strict'
// const store = require("./store");
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../lib/get-form-fields')
const store = require('../store')
// let turn = true;
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
  currentPlayer = 'x'
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}
// start player then go X and then to O
let currentPlayer = 'x'
// $('#message').text(`${currentPlayer} is the winner !`)
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

// wonGame()
// const game = {
// game: {
// cell: {
//   index: index,
//   value: player
//  },
//   over: store.game.over
//  }
// }
// api.updateGame(game)
//  .then(ui.onUpdateGameSuccess)
//  .catch(ui.onUpdateGameFailure)
//  turn = !turn
// return turn
// }

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
  //  store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }

  if (four === five && four === six && four !== '') {
    store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }

  if (seven === eight && seven === nine && seven !== '') {
  //  store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }
  // verticals
  if (one === four && one === seven && one !== '') {
  //  store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }

  if (two === five && two === eight && two !== '') {
  //  store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }
  if (three === six && three === nine && three !== '') {
  //  store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }
  // diagonals
  if (one === four && one === nine && one !== '') {
    // store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }
  if (three === five && three === seven && three !== '') {
  //  store.winner = currentPlayer
    $('#message').text(`Player ${currentPlayer} has won!`)
    return (store.game.over = true)
  }
  if (!cells.includes('')) {
    // store.winner = 'nobody'
    $('#message').text('draw try again !')
    return (store.game.over = true)
  }
  store.game.over = false
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onCreateGame,
  onUpdateGame,
  wonGame

}
