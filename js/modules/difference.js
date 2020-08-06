function difference (target, tId, arrBlocks, mobile = false)  {
  let h = {}
  let valHeights = []
  let heightBottom = []

  // вычисляем данные удаляемого блока - цель
  h.hTarget = target.offsetHeight
  h.tTarget = target.offsetTop
  h.idTarget = tId

  // через перебор, вычисляем разницу высоты с текущей линией
  for (let i = 0; i < arrBlocks.length; i++){
    let item = arrBlocks[i].closest('.block')
    // если текущий блок не на строке с удаляемым, то пропускаем цикл
    if (item.offsetTop !== h.tTarget) {
      continue
    }

    let itNext = arrBlocks[i + 1]
    // высчитываем есть ли следующий юлок
    if (itNext !== undefined) {
      let nextBottom = itNext.closest('.block')
      // добавляем высоту сьехавшего блока на текущую линию
      if (nextBottom.offsetLeft === 0 ) {
        h.hBottom = nextBottom.offsetHeight
        heightBottom.push({
          height: h.hBottom,
          id: i + 1
        })
        // вернем для мобилок разницу высоты
        if (h.hTarget === h.hBottom && mobile){
          h.mobileDiff = h.hTarget
          return h.mobileDiff
        }

      }

    }
    // если текущий блок - не цель, то добалвяем высоту его в массив
    if (h.idTarget !== i) {
      let hCur = item.offsetHeight

      valHeights.push({
        height: hCur,
        id: i
      })
    }

  } // цикл закончен
  
// если в массиве высот пусто, проверяем мобильную версию, и возвращаем разницу по условию
  if (valHeights.length === 0){
    if (mobile){
      // console.log('val 0, targetH - ' + h.hTarget)
      return h.hTarget
    }
    return 0
  }
// высчитываем максимальную высоту
  let max = valHeights.reduce((prev, cur) => {
    if (prev.height > cur.height) {
      return prev
    }
    return cur
  })

  max = max.height
  target = h.hTarget
  let bottom
  
  bottom = heightBottom.length > 0 ? heightBottom[0].height : null;
  let diff = 0
// проверяем цель большее ли максимальной из этой строки
  if (target > max || target < max) {
    diff = target - max
  }
// проверяем цель большее ли следущего нижнего блока
  if (target > bottom || target < bottom) {
    diff = target - bottom
  }

  if (target < max && max < bottom){
    diff = max - bottom
  }

  if (target > max && max > bottom){
    diff = target - max
  }

  if (target === max && max > bottom){
    diff = 0
  }

  if (target < max && max > bottom){
    diff = 0
  }

  
  return diff

}

// export default difference