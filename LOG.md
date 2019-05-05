# react 16

1. Error Boundary：componentDidCatch 注意：Event，异步事件不能 catch
    
2. 返回值可以为 string，number，boolean，null，portal，fragments（带有key属性的数组）

3. createPortal(element, container)：可以将组件渲染到指定的 container 上，不一定是当前组件的子组件

4. custom DOM Attribute 支持自定义属性

5. Fragment / <></>（简写目前支持不太好/babel7）

6. createContext(defaultValue).Provider/Consumer 通过 value 传递，Consumer 必须为 Provider 的子元素，否则匹配使用默认defaultValue

7. createRef / forwardRef（包裹元素，支持向下传递 ref，或者向 functional Component 传递 ref）
    
    原来的 callback ref 是在渲染完成后调用 callback 返回 function，入参为 ref 引用

8. 生命周期 
    1. getDerivedStateFromProps： 代替 componentWillMount/componentWillUpdate/componentWillReceiveProps，官方推荐只有当需要把 props 的 change 同步到 state 才用。setState 也会触发
    2. getSnapshotBeforeUpdate：代替 componentWillUpdate，在 render 触发之前执行，返回值会被当成 componentDidUpdate 的第三个参数

9. Profiler 性能分析工具 react-dev-tools

10. hooks: useState/useEffect 钩子函数
    const [count, setCount] = useState(defaultValue)
    useEffect(() => {}, [depends]) // depends 为该 effect 执行的依赖项

11. memo：嵌套 functional component，达到 pureComponent 的效果 React.memo(Component, compareFunc?) 

12. lazy、Suspense：组件懒加载，suspense 是 lazyComponent 的 container，fallback 是 loading 时候的回调方法

13. static getDerivedStateFromError()：作用与 componentDidCatch 类似，返回值为 state，官方推荐该方法用来设置 state，DidCatch 用来做错误上报。but why ?

14. static contextType：简化 createContext，设置 static contextType = XXXContext，可以直接通过 this.context 取到 context