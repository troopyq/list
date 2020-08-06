function scrollToInput(item, where = 'start', inline = 'nearest')  {
  item.scrollIntoView({
    behavior: 'smooth',
    block: where,
    inline: inline
  })
}

// export default scrollToInput