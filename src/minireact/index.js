import React from './core/minireact'
import minireactRender from './core/minireactrender'
import Demo from './demo'
console.log(minireactRender)
console.log(minireactRender.render)
minireactRender.render(<Demo />, document.getElementById('react'))