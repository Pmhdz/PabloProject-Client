'use strict'

const store = require('../store')

const onSignUpSuccess = (response) => {
  $('#message').text(`Thank you for signing up ${response.user.email}`)
  console.log(response)
  $('#sign-up').trigger('reset')
  $('#sign-in').hide()
  $('.board').hide()
}
const onSignUpFailure = () => {
  $('#message').text('Sign up failure')
  $('#sign-up').trigger('reset')
}
const onSignInSuccess = (response) => {
  $('#message').text(`Thank you for logging in ${response.user.email}`)
  store.token = response.user.token
  $('#sign-in').trigger('reset')
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out').show()
  $('#board').show()
}
const onSignInFailure = () => {
  $('#message').text('Sign in failure')
  $('#sign-in').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('#message').text('Thank you for signing out')
  $('#sign-out').trigger('reset')
}
const onSignOutFailure = () => {
  $('message').text('Sign out failure')
}

const onCreateGameSuccess = (response) => {
  $('#message').text('Ready to play! Change to O or X.')
  $('#sign-in').hide()
  $('sign-out').hide()
  store.game = response.game
  $('.board').show()
  $('.cell').text('')
}

const onCreateGameFailure = () => {
  $('message').text('Create game failure')
}
const onUpdateGameSuccess = (response) => {
  // console.log(response)
  // response.game.cells.forEach(function (val, i) {})
  $('#message').text('Update is successful!')
  store.game = response.game
  console.log(store.game)
}

const onUpdateGameFailure = () => {
  $('#message').text('Update failure')
}
const wonGame = (response) => {
  $('#message').text('You won!')
}

module.exports = {
  onSignUpFailure,
  onSignUpSuccess,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  wonGame
}
