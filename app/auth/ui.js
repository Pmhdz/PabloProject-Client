'use strict'
const { container } = require('webpack')
const store = require('../store')

const onSignUpSuccess = (response) => {
  $('#message').text(`Thank you for signing up ${response.user.email}`)
  console.log(response)
  $('#sign-up').trigger('reset')
}
const onSignUpFailure = () => {
  $('#message').text('Sign up failure')
  $('#sign-up').trigger('reset')
}
const onSignInSuccess = (response) => {
  $('#message').text(`Thank you for logging in ${response.user.email}`)
  store.token = response.user.token
  $('#sign-in').trigger('reset')
}
const onSignInFailure = (response) => {
  $('#message').text('Sign in failure')
  $('#sign-in').trigger('reset')
}

const onSignOutSuccess = () => {
  $('#message').text('Thank you for signing out')
  $('#sign-out').trigger('reset')
  $('#sign-in-form').show()
  $('#sign-up-form').show()
  $('#sign-out').hide()
}

const onSignOutFailure = () => {
  $('message').text('Sign out failure')
}

const onCreateGameSuccess = (response) => {
  $('message').text('Click on the board and choose where you want to place your O or X')
  $('#board').show
}
const onCreateGameFailure = () => {
  $('message').text('Create game failure')
  $('#game').trigger('reset')
}
const onUpdateGame = (response) => {
  console.log(response)
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
  onUpdateGame
}
