'use strict'
// const store = require("./store");
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../lib/get-form-fields')
const store = require('../store')
let turn = true
const onSignUp = function (event) {
  event.preventDefault()
  // get info from event and form
  const form = event.target
  const data = getFormFields(form)
  // make an api call using AJAX
  // handle successful api call with .then
  // handle failed api call with .catch
  api.signUp(data).then(ui.onSignUpSuccess).catch(ui.onSignUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  // get info from event and form
  const form = event.target
  const data = getFormFields(form)
  // make an api call using AJAX
  // handle successful api call with .then
  // handle failed api call with .catch
  api.signIn(data).then(ui.onSignInSuccess).catch(ui.onSignInFailure)
}
const onSignOut = function (event) {
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onSignOutFailure)
}
const onCreateGame = function (event) {
  // handle successful api call with .then
  // handle failed api call with .catch
  event.preventDefault()
  // get data
  const form = event.target
  const data = getFormFields(form)
  api
    .createGame(data)
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
  turn = true
  return true
}

const onUpdateGame = (event) => {
  // prevents click event from page refresh
  event.preventDefault()
  // board click holds click event
  const boardClicked = $(event.target)
  // data cell index clicked stored in index
  const index = $(boardClicked).data('cell-index')
  // store.gameIndex = index
  // console.log(store.gameIndex)
  // console.log(index)
  // console.log(store.game.over)
  // store.currentPlayer = currentPlayer
  // boardClicked.text(currentPlayer)
  const player = turn ? 'x' : 'o'
  store.game.cells[index] = player
  if (store.game.over) return
  // if statement and return
  // if ($(boardClicked).text()) return
  if ($($('.cell')[index]).text()) return

  checkWin()
  const game = {
    game: {
      cell: {
        index: index,
        value: player
      },
      over: store.game.over
    }
  }
  api
    .updateGame(game)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
  turn = !turn
  return turn
}
const checkWin = () => {
  const cells = store.game.cells
  const player = turn ? 'x' : 'o'
  // store.winner = currentPlayer
  if (cells[0] === cells[1] && cells[1] === cells[2] && cells[0] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[3] === cells[4] && cells[4] === cells[5] && cells[3] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[6] === cells[7] && cells[7] === cells[8] && cells[6] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[0] === cells[3] && cells[3] === cells[6] && cells[0] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[1] === cells[4] && cells[4] === cells[7] && cells[1] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[2] === cells[5] && cells[5] === cells[8] && cells[2] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[0] === cells[4] && cells[4] === cells[8] && cells[0] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
    return (store.game.over = true)
  }
  if (cells[2] === cells[4] && cells[4] === cells[6] && cells[2] !== '') {
    // store.winner = player
    $('#message').text(`Player ${player} has won!`)
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
  checkWin
}
