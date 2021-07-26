'use strict'

const store = require('../store')

const onSignUpSuccess = (response) => {
  $('#message').text(`Thank you for signing up ${response.user.email}`)
  console.log(response)
  $('#sign-up').trigger('reset')
  $('#sign-in').hide()
  $('.board').hide()
  $('#sign-up').hide()
  $('#sign-in').show()
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
}

const onCreateGameFailure = () => {
  $('message').text('Create game failure')
}
const onUpdateGameSuccess = (response) => {
  console.log('in then for game update')
  store.game = response.game
  store.playedCellsArray = store.game.cells
  console.log('api game is over', response.game.over)
}

const onUpdateGameFailure = () => {
  $('#message').text('Update failure')
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
  onUpdateGameFailure
}
