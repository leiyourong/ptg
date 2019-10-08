import React, { useState, useEffect } from 'react'
import { hydrate, render } from 'react-dom'
// import { HashRouter as Router } from 'react-router-dom'
// import App from './router/index'
// import { Provider } from 'react-redux'
// import {getClientStore} from './store/index'
// import Demo from './views/home'
// const divvv = (<div id='div1'>
//   <div xxx='123' id='div2'>我是一个divdivdiv</div>
// </div>)
// console.log(divvv)
// console.log(Demo)
// console.log(<Demo />)
// hydrate(
//   <Provider store={getClientStore()}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('react')
// )

const A = new Array(1e2).fill(0).map((_, i) => i + 1)
const B1 = [...A]
// 交换前两个元素，强制跳过数组检查
B1[1] = 3
B1[2] = 2

const B2 = [...A]
// 将最后一个元素放到前面去，触发其余元素的 placement
B2.unshift(B2.pop())
const B3 = [...A].reverse()

function WithSort (props) {
  const [toggle, setToggle] = useState(false)

  console.time(props.name)

  useEffect(() => {
    console.timeEnd(props.name)
  })

  return (
    <div style={{ flex: 'auto' }}>
      <button onClick={() => setToggle(!toggle)} key='button'>
        Toggle
      </button>
      {(toggle ? props.V : A).map(v => (
        <div key={`${v}`}>{v}</div>
      ))}
    </div>
  )
}

function App () {
  return (
    <div className='App' style={{ display: 'flex' }}>
      <WithSort name='without' V={B1} />
      {/* <WithSort name='with' V={B2} />
      <WithSort name='reverse' V={B3} /> */}
    </div>
  )
}

render(
  <App />,
  document.getElementById('react')
)
