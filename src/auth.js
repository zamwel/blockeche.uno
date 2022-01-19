import {
  load,
  stopload,
  usersRef,
  historyRef,
  PopupMessageModel,
  addADocument,
  auth,
  db
} from './config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

//login forms
const login = document.querySelector('.login-user')
const loginBtn = document.getElementById('su')
const register = document.querySelector('.register-user')
const signupBtn = document.getElementById('si')
const lgBtn = document.getElementById('user-btn')
const rgBtn = document.getElementById('user-btn2')
register.classList.add('hide-form')

login.classList.add('show-form')
register.classList.add('show-form')

$(document).ready(() => {
  rgBtn.addEventListener('click', e => {
    e.preventDefault()
    RegisterUser()
  })
  lgBtn.addEventListener('click', e => {
    e.preventDefault()
    LoginUser()
  })
  signupBtn.addEventListener('click', e => {
    e.preventDefault()
    login.classList.remove('hide-form')
    register.classList.add('hide-form')
  })
  loginBtn.addEventListener('click', e => {
    e.preventDefault()
    login.classList.add('hide-form')
    register.classList.remove('hide-form')
  })

  //***** Start of Get them to the auth file */
  //register users
  function RegisterUser () {
    const email = register.useremail.value
    const username = register.username.value
    const password1 = register.password.value
    const password2 = register.password2.value

    console.log(email, username, password1, password2)
    load()
    if (password1.toString().trim() !== password2.toString().trim()) {
      $('.err-two').text('Please your passwords do not match.')
      errcheck()
    } else {
      createUserWithEmailAndPassword(auth, email, password1)
        .then(credentials => {
          stopload()
          /*  PopupMessageModel(
            'Success',
            `Sign up process completed successfully with with email: ${credentials.user.email} and username: ${username}`,
            '#009e1a',
            () => {
              location.replace('/index.html')
            }
          ) */
          //add user detials
          var l = {
            username: username,
            userid: credentials.user.uid,
            password: password1,
            email: credentials.user.email,
            balance: 0,
            verified: 'false'
          }
          addADocument(usersRef, credentials.user.email, l)

          //add history list
          addADocument(historyRef, credentials.user.email, {
              uid: credentials.user.uid,
            history: `You created an account with email: ${
              credentials.user.email
            }, name: ${username} at ${Date()}`
          })
          register.reset()
        })
        .catch(err => {
          stopload()
          PopupMessageModel('Sign up Error', err.message, '#b60b0b', () => {})
        })
    }
  }

  //lgin users
  function LoginUser () {
    const email = login.useremail.value
    const password = login.password.value

    load()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        stopload()
        login.reset()
        PopupMessageModel(
          'Success',
          'You have successfully logged in to your account.',
          '#009e1a',
          () => {
            location.replace('/index.html')
          }
        )
      })
      .catch(err => {
        stopload()
        PopupMessageModel('Sign up Error', err.message, '#b60b0b', () => {})
      })
  }

  //close the error text
  function errcheck () {
    setTimeout(() => {
      $('.err-one').text('')
      $('.err-two').text('')
    }, 5000)
  }
  //***** End of Get them to the auth file */
})
