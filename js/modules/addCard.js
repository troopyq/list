// import inputChange from './inputChange.js'
// import scrollToInput from './scrollToInput.js'




function addCard (button, where = '.row-cards') {
  
  const btn = document.querySelector(button)

  btn.addEventListener('click', createCard)

  function createCard(){
    create()
    inputChange()

  }



  function create() {

    const parent = document.querySelector(where)


    let block = document.createElement('div')
    let item = document.createElement('div')
    let title = document.createElement('div')
    let h3 = document.createElement('h3')
    let title__input = document.createElement('textarea')
    let item__header = document.createElement('div')
    let item__close = document.createElement('button')
    let item__delete = document.createElement('button')
    let list = document.createElement('div')
    let list__ol = document.createElement('ol')
    let li = document.createElement('li')
    let list__input = document.createElement('textarea')
    let item__btn = document.createElement('div')
    let item__btn_delete = document.createElement('button')
    let item__btn_add = document.createElement('button')
    let item__btn_rename = document.createElement('button')

    block.className = 'block block_fadeIn'
    h3.className = 'title__text item__text'
    item.className = 'block__item item'
    title.className = 'item__title title'
    title__input.className = 'title__input'
    title__input.setAttribute('placeholder', 'Название списка')
    title__input.setAttribute('maxlength', '80')
    item__header.className = 'item__header'
    item__close.className = 'item__close item__header-btn isButton'
    item__close.textContent = '&#8212;'
    item__delete.className = 'item__delete item__header-btn isButton'
    item__delete.innerHTML = '&#10006;'
    list.className = 'item__list list'
    li.className = 'item__text li__text'
    list__ol.className = 'list__ol'
    list__input.className = 'list__input'
    list__input.setAttribute('placeholder', 'Название дела')
    list__input.setAttribute('maxlength', '120')
    item__btn.className = 'item__btn isButton'
    item__btn_delete.className = 'item__btn_delete item__btn_style isButton'
    item__btn_delete.innerHTML = '<span>--</span>'
    item__btn_add.className = 'item__btn_add item__btn_style isButton'
    item__btn_add.innerHTML = '<span>+</span>'
    item__btn_rename.className = 'item__btn_rename item__btn_style isButton'

    block.insertAdjacentElement("beforeend", item)
    h3.insertAdjacentElement("beforeend", title__input)
    title.insertAdjacentElement("beforeend", h3)
    item.insertAdjacentElement("beforeend", title)
    title.insertAdjacentElement("beforeend", item__header)
    item__header.insertAdjacentElement("beforeend", item__close)
    item__header.insertAdjacentElement("beforeend", item__delete)
    item.insertAdjacentElement("beforeend", list)
    list.insertAdjacentElement("beforeend", list__ol)
    list__ol.insertAdjacentElement("beforeend", li)
    li.insertAdjacentElement("beforeend", list__input)
    item.insertAdjacentElement("beforeend", item__btn)
    item__btn.insertAdjacentElement("beforeend", item__btn_rename)
    item__btn.insertAdjacentElement("beforeend", item__btn_delete)
    item__btn.insertAdjacentElement("beforeend", item__btn_add)
    parent.append(block)



    
    let count = document.querySelectorAll('.block').length
    block.style.order = `${count}`
    scrollToInput(title__input, 'center')



    title__input.onblur = () => {
      // scrollToInput(list__input)
      // list__input.focus()
    }

    block.classList.add('block_fadeIn')


    return ''
  }
  

}

// export default addCard