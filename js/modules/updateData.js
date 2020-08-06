function updateData ()  {

  const currentCards = cards.querySelectorAll('.block')

  if (currentCards.length >= 0){

    const message = {
      loading: 'Загрузка...',
      success: 'Данные успешно отправлены!',
      failure: 'Произошла ошибка...'
    }

    const postData = async (url, data) => {

      let res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      // console.log(JSON.stringify(data))

      return await res.json()

    }
    

    let dataForm = []
    currentCards.forEach((card, id) => {

      let title = card.querySelector('.title__text').textContent.replace(/\s+\r?\n/g, ' ').trim()
      let list = card.querySelectorAll('.li__text')
      let listValue = []

      let isLi = false
      list.forEach(li => {
        listValue.push({
          text: li.textContent.replace(/\s+\r?\n/g, ' ').trim(),
          complete: li.classList.contains('li__complete') || false
        })
        if (li.textContent.replace(/\s+\r?\n/g, ' ').trim().length > 0){
          isLi = true
        }
      })
      
      let info ={
        id: id,
        title: title,
        list: listValue
      } 
      // console.log(title.length)
      // console.log(isLi)

      if (title.length > 0 || isLi){
        dataForm.push(info)
      } else {
        // console.log('dont push')
      }

    })

    // console.log(dataForm[0])


    //  const formData = new FormData()
     const formData = dataForm

    // for (let key of dataForm) {
    //   formData.append(key, dataForm[key])
    // }


    postData('./vendor/updateData.php', formData)
      .then(res => {
        // console.log(res)
        
      })
      .catch(() => {
      
      })
      .finally(() => {
       
      })

    




  }

}

// export default updateData