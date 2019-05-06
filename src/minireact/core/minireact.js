const React = {
  Component: {
    props: 'xxxx'
  },
  // type/children 可能有class/div/字符串数字
  createElement: function (type, config, children) {
    let props = null
    if (children) {
      if (!Array.isArray(children)) {
        children = [children]
      }
      props = children.map(child => React.createElement(child))
    }
    return {
      $$type: 'miniReactElement',
      type,
      ...config,
      props
    }
  },
  children: {
    map: Array.map
  }
}

module.exports = React
