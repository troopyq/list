// import inputChange from './inputChange.js'
// import updateData from './updateData.js';


function addList ()  {
  


  cards.addEventListener('click', e => {
    let addBtn = document.querySelectorAll('.item__btn_add')
    let target = e.target
    

    addBtn.forEach((btn) => {

      if (target == btn || target == btn.firstElementChild){
        

        let inputs = document.querySelectorAll('.block textarea')
        inputs.forEach(item => {
          item.removeAttribute('autofocus')
        })

        let list = btn.closest('.block').querySelector('.list__ol')
        let isFirstEmpty = false
        isFirstEmpty = !(list.firstElementChild) ? false : (list.firstElementChild.textContent.length > 0) ? false : true;
        // console.log(isFirstEmpty)
        let li = document.createElement('li')
        let input = document.createElement('textarea')
        input.className = 'list__input'
        li.className = 'item__text li__text list_fadeIn'
        input.setAttribute('placeholder', 'Название дела') 
        input.setAttribute('autofocus', true)
        

        if (!isFirstEmpty){
          list.append(li)
          li.append(input)
          input.focus()
          inputChange()
          updateData()
          
        } else if (list.firstElementChild){
          list.firstElementChild.firstElementChild.focus()
        }
        

      }

    }) // forEach addBtn

  }) //body LISTENER



}

// export default addList