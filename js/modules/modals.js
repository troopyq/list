function modals ()  {
  const bindModals = (triggerSelector, modalSelector, closeSelector, closeClckOverlay = true) => {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('.popup')

    let scroll = calcScroll()

    function calcScroll() {
      let div = document.createElement('div')
      div.style.width = '50px'
      div.style.height = '50px'
      div.style.overflowY = 'scroll'

      document.body.appendChild(div)
      let scrollWidth = div.offsetWidth - div.clientWidth

      return scrollWidth
    }

    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) e.preventDefault();

        windows.forEach(item => {
          item.classList.remove('popup_visible')
        })

        scroll = calcScroll()
        // modal.style.display = 'block'
        modal.classList.add('popup_visible')
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scroll}px`
        document.querySelector('header').style.paddingRight = `${scroll}px`

      })
    })

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.classList.remove('popup_visible')
      })
      modal.classList.remove('popup_visible')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ``
      document.querySelector('header').style.paddingRight = ``

    })

    modal.addEventListener('mousedown', (e) => {

      if ((e.target === modal) && closeClckOverlay) {
        modal.classList.remove('popup_visible')
        document.body.style.overflow = ''
        document.body.style.paddingRight = ``
        document.querySelector('header').style.paddingRight = ``

        windows.forEach(item => {
          item.classList.remove('popup_visible')
        })
      }
    })
  }


  bindModals('.login', '.popup__signin', '.popup__signin .popup__close')
  bindModals('.a__signup', '.popup__signup', '.popup__signup .popup__close')
  bindModals('.a__signin', '.popup__signin', '.popup__signin .popup__close')

}
// export default modals