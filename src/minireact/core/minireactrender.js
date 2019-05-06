const reactRender = {
  render: function (Cmp, container) {
    if (typeof Cmp.type === 'number' || typeof Cmp.type === 'string') {
      if (Cmp.type === 'div') {
        const divEle = document.createElement('div')
        container.innerHTML = divEle.outerHTML
        return reactRender.render(Cmp.props, divEle)
      }
      container.innerHTML = Cmp.type
      return container.innerHTML
    }
    const comp = new Cmp.type()
    return reactRender.render(comp.render(), container)
  }
}

module.exports = reactRender
