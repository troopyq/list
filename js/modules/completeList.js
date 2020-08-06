// import updateData from './updateData.js'

function completeList ()  {
  // let list = document.getElementsByClassName('list__complete')

  // for (let li of list){
    
  //   li.addEventListener('click', () => {
  //     if (li.classList.contains('list__complete') && !li.classList.contains('text__rename')){
  //       li.classList.toggle('li__complete')
  //     }
  //   })

  // }

  cards.addEventListener('click' , e => {
    let tar = e.target
    let block = cards.querySelectorAll('.block')
    block.forEach(b => {
      let list = b.querySelectorAll('.li__text')
      list.forEach(li => {
        if (tar === li){
          let liCl = li.classList
          if (liCl.contains('list__complete') && !liCl.contains('text__rename')){
            liCl.toggle('li__complete')
            updateData()
          }
        }
      })
    })

  })

}

// export default completeList