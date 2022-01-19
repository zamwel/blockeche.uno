import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyC5xMwQV50IkgQqmqUvmoztLqohUimy8us',
  authDomain: 'unicctools.firebaseapp.com',
  projectId: 'unicctools',
  storageBucket: 'unicctools.appspot.com',
  messagingSenderId: '220105354397',
  appId: '1:220105354397:web:ba52dae0235e12934d7874'
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
let users = []

//get collection
export const usersRef = collection(db, 'unicctoolsusers')
export const historyRef = collection(db, 'unicctoolshistory')
export const purchaseRef = collection(db, 'unicctoolspurchse')
export const otherRef = collection(db, 'unicctoolsothers')
export const dashboardRef = collection(db, 'unicctoolsdashboard')
export const ccRef = collection(db, 'unicctoolscreditcards')
export const ssRef = collection(db, 'unicctoolsshoppingscript')
export const lcRef = collection(db, 'unicctoolslogincredentials')
export const tsRef = collection(db, 'unicctoolstutorials')
export const apiRef = collection(db, 'unicctoolsapikeys')
export const uidref = collection(db, 'unicctoolsuids')
export const supportRef = collection(db, 'unicctoolssupport')

//modal elements
var modal = document.getElementById('myModal')
var loading = document.getElementById('myLoadingModal')
var message = document.getElementById('myMessageModal')
var paymodal = document.getElementById('PaymentModal')
var lookupmodal = document.getElementById('LookupModal')

export var user,
  email,
  username,
  modal,
  loading,
  paymodal,
  data,
  amt,
  index,
  message,
  bal,
  tba,
  stringitems,
  item,
  topup = false,
  signedin = false,
  loguser,
  queries,
  userdet = []
//Authetication listener

export function setIndex (index, data, amt) {
  this.index = index;
  this.data = data;
  this.amt = amt;
}

onAuthStateChanged(auth, user => {
  loguser = user
  if (user) {
    
    AddNewNav(user)
    queries = query(usersRef, where('email', '==', user.email))
    onSnapshot(queries, snapshot => {
      snapshot.docs.forEach(doc => {
        userdet.push({ ...doc.data(), uid: doc.id })
      })
    })
  } else {
    AddNewNav(user)
    console.log('NO!, user detected')
  }
})
//get userdetails before hand

//get collection documents
export function getACollection (collectionname) {
  getDoc(collectionname)
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        users.push({ ...doc.data(), uid: doc.id })
      })
    })
    .catch(err => {
      PopupMessageModel('Error', err, '#b60b0b', () => {})
    })
}

export function getAllSnapshotCollection (collectionname) {
  onSnapshot(collectionname, snapshot => {
    snapshot.docs.forEach(doc => {
      users.push({ ...doc.data(), uid: doc.id })
    })
  }).catch(err => {
    PopupMessageModel('Error', err, '#b60b0b', () => {})
  })
}

//get a document

//add docments
export function addADocument (collectionname, id, object, condition) {
  load()
  setDoc(doc(collectionname, id), object)
    .then(() => {
      stopload()
      if (condition) {
        PopupMessageModel(
          'Success',
          'Document successfully added',
          '#009e1a',
          () => {}
        )
      }
    })
    .catch(err => {
      stopload()
      PopupMessageModel('Error', err, '#b60b0b', () => {})
    })
}

//custoem alert dialogs
export function load () {
  loading.style.display = 'block'
}
export function stopload () {
  loading.style.display = 'none'
}

export function PopupMessageModel (title, msg, color, callback) {
  message.style.display = 'block'

  $('#myMessageModal .modal-exit').click(() => {
    message.style.display = 'none'
    callback()
  })
  $('#myMessageModal .modal-cancel').click(() => {
    message.style.display = 'none'
    callback()
  })
  $('#myMessageModal .modal-content').css('color', '#ffffff')
  $('#myMessageModal .modal-content').css('background', color)
  $('#myMessageModal .modal-content').css('border', 'none')

  $('#myMessageModal h2').text(title)

  $('#myMessageModal p').text(msg)

  window.onclick = function (event) {
    if (event.target == modal) {
      message.style.display = 'none'
      // document.querySelector('body > div > div > nav').style.display = 'none'
    }
  }
}
export function OpenLookupCC (title, msg) {
  lookupmodal.style.display = 'block'

  $('#LookupModal .modal-exit').click(() => {
    lookupmodal.style.display = 'none'
  })
  $('#LookupModal .modal-cancel').click(() => {
    lookupmodal.style.display = 'none'
  })

  $('#LookupModal h2').text(title)

  window.onclick = function (event) {
    if (event.target == modal) {
      lookupmodal.style.display = 'none'
    }
  }
}
export function PopupConfirmModel (title, message, callback) {
  var proceed = confirm(message)
  if (proceed) {
    callback()
  } else {
    //callback
  }
}

export function removeuserdetials () {
  localStorage.setItem('login', 'false')
  localStorage.removeItem('email')
  localStorage.removeItem('uid')
  localStorage.removeItem('username')
  localStorage.removeItem('balance')
  localStorage.removeItem('verified')
  localStorage.removeItem('password')
}
export function signout () {
  load()
  hidepopup()
  addADocument(historyRef, genstr(10), {
    history: `You signed out of your account @ ${Date()}`,
    id: loguser.email
  })
  auth.signOut().then(() => {
    stopload()
    removeuserdetials()
    location.replace('/auth.html')
  })
}

//signout user
$('#auth-div-on #auth-id').click(e => {
  e.preventDefault()
  logout()
})

export function logout () {
  PopupConfirmModel(
    'Logout',
    'Do you really want to logout from this account?',
    signout
  )
}

export function signinuser () {
  hidepopup
  location.replace('/auth.html')
}

export function genstr (len) {
  var p = '0123456789'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}
export function genorder (len) {
  var p = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}

export function buynow (data, index, amt) {
  modal.style.display = 'none'
  bal = parseInt(userdet[0].balance)
  stringitems = `network: ${data[index].network}\n
       card: ${data[index].card}${genstr(10)}\n
       cvv: ${data[index].cvv}\n
       pin: ${data[index].pin}\n
       expiry: ${data[index].expiry}\n
       bank: ${data[index].bank}\n
       balance: ${data[index].balance}\n
       fullname: ${data[index].fullname}\n
       email: ${data[index].email}\n
       phone: ${data[index].phone}\n
       address: ${data[index].address}\n
       zip: ${data[index].zip}\n
       country: ${data[index].country}\n
       state: ${data[index].state}\n
       city: ${data[index].city}`

  item = [$('.top-products').val(), stringitems, genorder(8), Date()]

  if (bal < amt) {
    loadAPI(amt, false)
    return
  } else {
    tba = bal - amt
    makePurchase(tba, item, false)
    return
  }
}

export function hidepopup () {
  modal.style.display = 'none'
}

export function closepayment () {
  paymodal.style.display = 'none'
}
export function OpenPaymentModal (data, topup) {
  paymodal.style.display = 'block'
  var created = Date.parse(data.created_at)
  var ending = Date.parse(data.expires_at)
  var now = Date.parse(Date())

  //console.log(created, ending, now)

  let s = setInterval(() => {
    if (now >= ending) {
      //todo
      PopupMessageModel(
        'Time up',
        'The allocated time for the payment to be made has ellaped. Payment cancelled',
        '#b60b0b',
        closepayment
      )
      clearInterval(s)
    }
  }, 60000)

  paywithBTC(data, topup)
}

export function paywithBTC (crypto, topup) {
  SniffPaymentStatus(crypto.code, topup)
  var element = `
                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                    <p class="pay-description">${crypto.description}</p>
  
                    <div id="qrcode"></div>
                    <div class="cs">
  
                        <!-- <p>Select your payment type</p> -->
                        <select id="cccs" class="top-products">
                            <option value="1">Bitcoin</option>
                            <option value="2">Ethereum</option>
                            <option value="3">Litecoin</option>
                            <option value="4">Bitcoin Cash</option>
                            <option value="5">Dai</option>
                            <option value="6">Dogecoin</option>
                        </select>
                    </div>
                    <div class="money-content">
                        <p class="cn">Crypto <span class="cname logo-style">Bitcoin</span></p>
                        <p class="amount">$<span
                                class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                        </p>
                        <p class="camount">${crypto.pricing.bitcoin.currency}<span
                                class="coin logo-style">${crypto.pricing.bitcoin.amount}</span></p>
                    </div>
                    <hr>
                    <p class="cn">Copy the address below</p>
                    <p class="amount"><span class="address logo-style">${crypto.addresses.bitcoin}</span></p>
                
                   <br>
                    <p class="process"></p>
                    <br>
                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                        issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.bitcoin,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto, topup)
        break
      case 2:
        paywithETC(crypto, topup)
        break
      case 3:
        paywithLTC(crypto, topup)
        break
      case 4:
        paywithBCH(crypto, topup)
        break
      case 5:
        paywithDAI(crypto, topup)
        break
      case 6:
        paywithDOG(crypto, topup)
        break
    }
  })
}
export function paywithETC (crypto, topup) {
  SniffPaymentStatus(crypto.code, topup)
  var element = `
                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                    <p class="pay-description">${crypto.description}</p>
  
                    <div id="qrcode"></div>
                    <div class="cs">
  
                        <!-- <p>Select your payment type</p> -->
                        <select id="cccs" class="top-products">
                        <option value="2">Ethereum</option>
                            <option value="1">Bitcoin</option>
                            <option value="3">Litecoin</option>
                            <option value="4">Bitcoin Cash</option>
                            <option value="5">Dai</option>
                            <option value="6">Dogecoin</option>
                        </select>
                    </div>
                    <div class="money-content">
                        <p class="cn">Crypto <span class="cname logo-style">eEthereum</span></p>
                        <p class="amount">$<span
                                class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                        </p>
                        <p class="camount">${crypto.pricing.ethereum.currency}<span
                                class="coin logo-style">${crypto.pricing.ethereum.amount}</span></p>
                    </div>
                    <hr>
                    <p class="cn">Copy the address below</p>
                    <p class="amount"><span class="address logo-style">${crypto.addresses.ethereum}</span></p>
                    <br>
                   <br>
                    <p class="process"></p>
                    <br>
                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                        issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.ethereum,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })

  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto, topup)
        break
      case 2:
        paywithETC(crypto, topup)
        break
      case 3:
        paywithLTC(crypto, topup)
        break
      case 4:
        paywithBCH(crypto, topup)
        break
      case 5:
        paywithDAI(crypto, topup)
        break
      case 6:
        paywithDOG(crypto, topup)
        break
    }
  })
}
export function paywithLTC (crypto, topup) {
  SniffPaymentStatus(crypto.code, topup)
  var element = `
                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                    <p class="pay-description">${crypto.description}</p>
  
                    <div id="qrcode"></div>
                    <div class="cs">
  
                        <!-- <p>Select your payment type</p> -->
                        <select id="cccs" class="top-products">
                        <option value="3">Litecoin</option>
                            <option value="1">Bitcoin</option>
                            <option value="2">Ethereum</option>
                            <option value="4">Bitcoin Cash</option>
                            <option value="5">Dai</option>
                            <option value="6">Dogecoin</option>
                        </select>
                    </div>
                    <div class="money-content">
                        <p class="cn">Crypto <span class="cname logo-style">Litecoin</span></p>
                        <p class="amount">$<span
                                class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                        </p>
                        <p class="camount">${crypto.pricing.litecoin.currency}<span
                                class="coin logo-style">${crypto.pricing.litecoin.amount}</span></p>
                    </div>
                    <hr>
                    <p class="cn">Copy the address below</p>
                    <p class="amount"><span class="address logo-style">${crypto.addresses.litecoin}</span></p>
                    <br>
                   <br>
                    <p class="process"></p>
                    <br>
                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                        issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.litecoin,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto, topup)
        break
      case 2:
        paywithETC(crypto, topup)
        break
      case 3:
        paywithLTC(crypto, topup)
        break
      case 4:
        paywithBCH(crypto, topup)
        break
      case 5:
        paywithDAI(crypto, topup)
        break
      case 6:
        paywithDOG(crypto, topup)
        break
    }
  })
}
export function paywithBCH (crypto, topup) {
  SniffPaymentStatus(crypto.code, topup)
  var element = `
                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                    <p class="pay-description">${crypto.description}</p>
  
                    <div id="qrcode"></div>
                    <div class="cs">
  
                        <!-- <p>Select your payment type</p> -->
                        <select id="cccs" class="top-products">
                        <option value="4">Bitcoin Cash</option>
                            <option value="1">Bitcoin</option>
                            <option value="2">Ethereum</option>
                            <option value="3">Litecoin</option>
                            <option value="5">Dai</option>
                            <option value="6">Dogecoin</option>
                        </select>
                    </div>
                    <div class="money-content">
                        <p class="cn">Crypto <span class="cname logo-style">Bitcoin Cash</span></p>
                        <p class="amount">$<span
                                class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                        </p>
                        <p class="camount">${crypto.pricing.bitcoincash.currency}<span
                                class="coin logo-style">${crypto.pricing.bitcoincash.amount}</span></p>
                    </div>
                    <hr>
                    <p class="cn">Copy the address below</p>
                    <p class="amount"><span class="address logo-style">${crypto.addresses.bitcoincash}</span></p>
                    <br>
                   <br>
                    <p class="process"></p>
                    <br>
                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                        issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.bitcoincash,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto, topup)
        break
      case 2:
        paywithETC(crypto, topup)
        break
      case 3:
        paywithLTC(crypto, topup)
        break
      case 4:
        paywithBCH(crypto, topup)
        break
      case 5:
        paywithDAI(crypto, topup)
        break
      case 6:
        paywithDOG(crypto, topup)
        break
    }
  })
}
export function paywithDAI (crypto, topup) {
  SniffPaymentStatus(crypto.code, topup)
  var element = `
                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                    <p class="pay-description">${crypto.description}</p>
  
                    <div id="qrcode"></div>
                    <div class="cs">
  
                        <!-- <p>Select your payment type</p> -->
                        <select id="cccs" class="top-products">
                        <option value="5">Dai</option>
                            <option value="1">Bitcoin</option>
                            <option value="2">Ethereum</option>
                            <option value="3">Litecoin</option>
                            <option value="4">Bitcoin Cash</option>
                            <option value="6">Dogecoin</option>
                        </select>
                    </div>
                    <div class="money-content">
                        <p class="cn">Crypto <span class="cname logo-style">Dai</span></p>
                        <p class="amount">$<span
                                class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                        </p>
                        <p class="camount">${crypto.pricing.dai.currency}<span
                                class="coin logo-style">${crypto.pricing.dai.amount}</span></p>
                    </div>
                    <hr>
                    <p class="cn">Copy the address below</p>
                    <p class="amount"><span class="address logo-style">${crypto.addresses.dai}</span></p>
                    <br>
                   <br>
                    <p class="process"></p>
                    <br>
                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                        issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.dai,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })

  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto, topup)
        break
      case 2:
        paywithETC(crypto, topup)
        break
      case 3:
        paywithLTC(crypto, topup)
        break
      case 4:
        paywithBCH(crypto, topup)
        break
      case 5:
        paywithDAI(crypto, topup)
        break
      case 6:
        paywithDOG(crypto, topup)
        break
    }
  })
}
export function paywithDOG (crypto, topup) {
  SniffPaymentStatus(crypto.code, topup)
  var element = `
                    <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                    <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                    <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                    <p class="pay-description">${crypto.description}</p>
  
                    <div id="qrcode"></div>
                    <div class="cs">
  
                        <!-- <p>Select your payment type</p> -->
                        <select id="cccs" class="top-products">
                        <option value="6">Dogecoin</option>
                            <option value="1">Bitcoin</option>
                            <option value="2">Ethereum</option>
                            <option value="3">Litecoin</option>
                            <option value="4">Bitcoin Cash</option>
                            <option value="5">Dai</option>
                        </select>
                    </div>
                    <div class="money-content">
                        <p class="cn">Crypto <span class="cname logo-style">Dogecoin</span></p>
                        <p class="amount">$ <span
                                class="amt logo-style">${crypto.pricing.local.amount} </span> ${crypto.pricing.local.currency}
                        </p>
                        <p class="camount">${crypto.pricing.dogecoin.currency}<span
                                class="coin logo-style">${crypto.pricing.dogecoin.amount}</span></p>
                    </div>
                    <hr>
                    
                    <p class="cn">Copy the address below</p>
                    <p class="amount"><span class="address logo-style">${crypto.addresses.dogecoin}</span></p>
                    <br>
                   <br>
                    <p class="process"></p>
                    <br>
                    <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                        issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.dogecoin,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto, topup)
        break
      case 2:
        paywithETC(crypto, topup)
        break
      case 3:
        paywithLTC(crypto, topup)
        break
      case 4:
        paywithBCH(crypto, topup)
        break
      case 5:
        paywithDAI(crypto, topup)
        break
      case 6:
        paywithDOG(crypto, topup)
        break
    }
  })
}
export function SniffPaymentStatus (code, topup) {
  $('#PaymentModal .process').text('Initiate a Payment now!')
  $('#PaymentModal .process').css('color', '#b60b0b')
  let stop = setInterval(() => {
    var url =
      'https://api.commerce.coinbase.com/charges/' + /* code */ 'HW3NYY22'
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.setRequestHeader('X-CC-Api-Key', 'e5b8792b-a383-4f80-8e8e-df52e0ebaf63')
    xhr.setRequestHeader('X-CC-Version', '2018-03-22')

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //console.log(xhr.status)

        // console.log('Sniffed data: ',JSON.parse(xhr.responseText).data)
        var sniffed = JSON.parse(xhr.responseText).data

        console.log(sniffed.timeline.length)
        var sniffedlen = sniffed.timeline.length
        sniffed.timeline.forEach(element => {
          console.log(element.status)
          if (
            element.status
              .toString()
              .toLowerCase()
              .trim() === 'completed' ||
            element.status
              .toString()
              .toLowerCase()
              .trim() === 'resolved'
          ) {
            makePurchase(
              parseInt(sniffed.pricing.local.amount),
              ['Topup', '', genorder(8), Date()],
              topup
            )
            addADocument(
              historyRef,
              genstr(10),
              {
                id: userdet[0].email,
                history: `Successfully paied an amount of $${sniffed.pricing.local.amount} into your account.`
              },
              true
            )
            clearInterval(stop)
            PopupMessageModel(
              'Successful Payment',
              'You have successfully completed the payment process.',
              '#009e1a',
              closepayment
            )
            $('#PaymentModal .process').text('Payment completed')
            $('#PaymentModal .process').css('color', '#009e1a')
            return
          }
          if (
            sniffed.timeline.length === 3 &&
            sniffed.timeline[2].status
              .toString()
              .toLowerCase()
              .trim() === 'unresolved' &&
            sniffed.timeline[2].context
              .toString()
              .toLowerCase()
              .trim() === 'underpaid'
          ) {
            clearInterval(stop)
            PopupMessageModel(
              'Payment Warning',
              `Your payment is unresolved meaning you paid less than the specified amount. Check the remaining balance $(${sniffed
                .pricing.local.amount -
                payments.value.local
                  .amount}) and complete the payment with same crypto wallet address.`,
              '#fbff00',
              () => {}
            )
            $('#PaymentModal .process').text('Payment Underpaid!')
            $('#PaymentModal .process').css('color', '#20272e')
            return
          }
          if (sniffedlen === 1) {
            //new payment detected
            $('#PaymentModal .process').text('Payment Initiated!')
            $('#PaymentModal .process').css('color', '#1d0d0d')
            return
          }
          if (sniffedlen === 2) {
            //processing data in progress
            $('#PaymentModal .process').text(
              'Pending: Waiting for confirmation'
            )
            $('#PaymentModal .process').css('color', '#009e1a')
            return
          }
        })
      }
    }
    xhr.send(data)
  }, 10000)
}

$('.telegram').click(() => {
  window.open('https://t.me/betwayx10')
})

/* setInterval(() => {
  if (authstatechanges === false) {
    $('.acc').css('display', 'none')
  }
}, 100) */

function AddNewNav (user) {
  let a = `<!-- Primary navigation menu -->
  <input id="close" class="close" type="button" value="X">

  <ul class="primary-nav">
      <li class="current"><a href="/index.html">Home</a></li>
      <li><a href="/buy.html">Buy</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/support.html">Support</a></li>
  </ul>
  <!-- Secondary navigation menu -->
  <ul class="secondary-nav">
     
      <input type="button" id="auth-id" class="auth-class" value="Authenticate">
    
  </ul>`
  let b = `<!-- Primary navigation menu -->
  <input id="close" class="close" type="button" value="X">

  <ul class="primary-nav">
      <li class="current"><a href="/index.html">Home</a></li>
      <li><a href="/buy.html">Buy</a></li>
      <li><a href="/account.html">Account</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/support.html">Support</a></li>
  </ul>
  <!-- Secondary navigation menu -->
  <ul class="secondary-nav">
      
          <input type="button" id="sign-id" class="auth-class" value="Signout">
     
  </ul>`

  if (user) {
    document.querySelector('nav').innerHTML = b
  } else {
    document.querySelector('nav').innerHTML = a
  }
}
export function closeSlide () {
  document.querySelector('#close').addEventListener('click', e => {
    e.preventDefault()
    $('.menu-slide').css('display', 'none')
  })
}
$(document).ready(()=>{
  authentication()
  if (document.querySelector('.year') !== null) {
    document.querySelector('.year').innerHTML = new Date().getFullYear()
  }
})

function authentication () {
  document.querySelector('#auth-id').addEventListener('click', e => {
    location.replace('/auth.html')
  })
  document.querySelector('#sign-id').addEventListener('click', e => {
    logout()
  })
}

export function makePurchase (bal, item, tp) {
  if (tp === true) {
    const docref = doc(usersRef, userdet[0].email)
    updateDoc(docref, {
      balance: bal + parseInt(userdet[0].balance)
    })
      .then(function (val) {
        PopupMessageModel(
          'Account Fund',
          `You have successfully topped up your account for $${bal}. Check your account pannel for your purchase details.`,
          '#009e1a',
          () => {
            location.reload()
          }
        )

        addADocument(
          historyRef,
          genstr(10),
          {
            id: userdet[0].email,
            history: `Account fund order ${item[2]} with amount of $${bal} was successfull at ${item[3]}`
          },
          false
        )
      })
      .catch(e => {
        addADocument(
          historyRef,
          genstr(10),
          {
            id: userdet[0].email,
            history: `Account fund order ${item[2]} was not successfull at ${item[3]}`
          },
          false
        )
        PopupMessageModel('PURCHASING ERROR', e, '#b60b0b', () => {})
      })
    return
  } else {
    let m = {
      product: item[0],
      data: item[1],
      order: item[2],
      datetime: item[3],
      id: userdet[0].email
    }

    setDoc(doc(purchaseRef, genstr(15)), m)
      .then(function (val) {
        addADocument(
          historyRef,
          genstr(10),
          {
            id: userdet[0].email,
            history: `Successfully purchased a(an) ${item[0]} for $${bal} with order# ${item[2]} at ${item[3]}`
          },
          true
        )

        const docref = doc(usersRef, userdet[0].email)
        updateDoc(docref, {
          balance: bal
        }).then(function (val) {
          PopupMessageModel(
            'SUCCESSFULL PURCHASE',
            'You have successfully purchased item of order ' +
              item[2] +
              '. Check your account pannel for your purchase details.',
            '#009e1a',
            () => {
              location.reload()
            },false
          )
        })

        //location.reload()
        // return
      })
      .catch(e => {
        addADocument(
          historyRef,
          genstr(10),
          {
            id: userdet[0].email,
            history: `Order ${item[2]} was not successfull at ${item[3]}`
          },
          false
        )
        PopupMessageModel('PURCHASING ERROR', e, '#b60b0b', () => {})
      })
  }
}

export function loadAPI (amt, topup) {
  console.log('is topup action?:', topup)

  var email = localStorage.getItem('email')
  var uid = localStorage.getItem('uid')
  var username = localStorage.getItem('username')
  var balance = localStorage.getItem('balance')

  var url = 'https://api.commerce.coinbase.com/charges/'

  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('X-CC-Api-Key', 'e5b8792b-a383-4f80-8e8e-df52e0ebaf63')
  xhr.setRequestHeader('X-CC-Version', '2018-03-22')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status)
      console.log(url, JSON.parse(xhr.responseText).data)
      OpenPaymentModal(JSON.parse(xhr.responseText).data, topup)
    }
  }

  var data = `{
       "name": "UNICCSTOOLS",
       "description": "Make your payment to recieve your Credit Card info for the amount, $${amt} placed via any of the crypto wallet address below, you can choose to pay with any of the underlisted cryptocoins below.",
       "local_price": {
         "amount": "${amt}",
         "currency": "USD"
       },
       "pricing_type": "fixed_price",
       "metadata": {
         "customer_id": "${genstr(10)}",
         "customer_name": "${username}",
         "customer_email": "${email}",
         "date_tme": "${Date()}"
       },
       "redirect_url": "https://charge/completed/page",
       "cancel_url": "https://charge/canceled/page"
     }`
  console.log('Data:', amt, genstr(10), username, email)

  xhr.send(data)
}
