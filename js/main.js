;(() => {
  const e = document.getElementById('menu-icon'),
    n = document.querySelector('nav'),
    t = document.getElementById('close')
  e.addEventListener('click', () => {
    n.classList.add('menu-slide')
  }),
    t.addEventListener('click', () => {
      n.classList.remove('menu-slide')
    }),
    document.querySelector('#close').addEventListener('click', e => {
      e.preventDefault(), $('.menu-slide').css('display', 'none')
    })
})()
