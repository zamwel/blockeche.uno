const mobileOpenIcon = document.getElementById('menu-icon')
const nav = document.querySelector('nav')
const mobileCloseIcon = document.getElementById('close')

mobileOpenIcon.addEventListener('click', () => {
  nav.classList.add('menu-slide')
})

mobileCloseIcon.addEventListener('click', () => {
  nav.classList.remove('menu-slide')
})

document.querySelector('#close').addEventListener('click', (e) => {
  e.preventDefault()
 $('.menu-slide').css('display', 'none')
})

//console.log(dm.data.timeline[0].status.toString())
parsewebpages()

 function parsewebpages () {
  var url = '/src/file.json'
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      var html = xhr.responseText
      //console.log('coin marketcap', html)
    }
  }
  xhr.onerror = () => {
    console.log(xhr.status, xhr.statusText)
  }
  xhr.send()
}
 




//$('.acc').css('display', 'block')
//$('.acc').css('display', 'none')