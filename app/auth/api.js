'use strict'

const store = require('../store')
const signUp = function (data) {
  console.log(data)
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up/',
    method: 'POST',
    data: data
  })
}
const signIn = function (data) {
  console.log(data)
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in/',
    method: 'POST',
    data: data
  })
}
const signOut = function () {
  console.log()
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer' + store.token
    }
  })
}
const createGame = function () {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/game/',
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + store.token
    }
  })
}

const updateGame = function () {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com/game/',
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + store.token
    },
    date: {
      game: {
        cells: {
          index: store.gameIndex,
          value: store.currentPlayer
        }
      }
    }
  })
}
module.exports = {
  signUp,
  signIn,
  signOut,
  createGame,
  updateGame
}
