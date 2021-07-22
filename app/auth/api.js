'use strict'
const config = require('./../config')
const store = require('../store')
const signUp = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}
const signIn = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}
const signOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}
const createGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.token
    }
  })
}

const updateGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games/' + 'store.game._id',
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.token
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
