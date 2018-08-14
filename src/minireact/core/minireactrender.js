const reactRender = {
    render: function (component, container) {
        if (typeof component.type === 'number' || typeof component.type === 'string') {
            if (component.type === 'div') {
                const divEle = document.createElement('div')
                container.innerHTML = divEle.outerHTML
                return reactRender.render(component.props, divEle)
            }
            
            return container.innerHTML = component.type 
        }
        const comp = new component.type()
        return reactRender.render(comp.render(), container)
    }
}

module.exports = reactRender