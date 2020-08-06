// import inputChange from "./inputChange.js"
// // import completeList from './completeList.js'

function renameList ()  {

  document.body.addEventListener('click', (e) => {
    let tar = e.target
    let renameBtn = cards.querySelectorAll('.item__btn_rename')

    renameBtn.forEach(item => {
      let block = item.closest('.block')
      let text = block.querySelectorAll('.item__text')
      text.forEach(ren => {
        if (tar !== item && tar !== ren && tar !== ren.parentElement){
          item.classList.remove('item__btn_rename-active')
          ren.classList.remove('text__rename')
        }
      })
      

      if (tar === item){
        
        
        



        item.classList.toggle('item__btn_rename-active')

        // text.forEach(target => {
        for (let i = 0; i < text.length; i++) {
          let target = text[i]

          if (item.classList.contains('item__btn_rename-active')){
            target.classList.add('text__rename')
          }else {
            target.classList.remove('text__rename')
            continue;
            
          }

          let click = false

          target.addEventListener('click', rename)
          if (click){
            target.removeEventListener('click', rename)
          }

          function rename() {

            let input = document.createElement('textarea')

            if (item.classList.contains('item__btn_rename-active') && !click) {
              click = true
              if (target.classList.contains('title__text')) {
                // console.log(target)
                input.classList.add('title__input')
                input.setAttribute('placeholder', 'Название списка')
                input.setAttribute('maxlength', '60')
              } /* else if (target.classList.contains('li__text') || target.classList.contains('list__input')) { */
                else{
                input.classList.add('list__input') 
                input.setAttribute('placeholder', 'Название дела')
                input.setAttribute('maxlength', '90')
              }

              let content = target.textContent.replace(/\s+\r?\n/g, ' ').trim()
              // console.log(content)
              target.innerHTML = ''

              target.append(input)
              input.focus()
              // input.value = (content.replace(/\r?\n/g, "")).trim()
              input.value = content

              inputChange()

            }



          }

        // })
        }

      }

    })

  })

  

}

// export default renameList