'use babel';

(function() {
  'use strict'

  class Component {
    constructor(tagName, renderView) {
      this.element = null
    }
    render() {

    }
    renderAsString() {

    }
    dispose() {
      this.element = null
    }
  }

  export function component(component) {
    if (typeof component !== 'object') {
      throw new Error('Invalid component params provided')
    }
    if (typeof component.tagName !== 'string') {
      throw new Error('tagName must be string')
    }
    if (typeof component.renderView !== 'function') {
      throw new Error('renderView must be a function')
    }
    const currentComponent = Object.create(Component)
    for (let key in component) {
      if (key === 'tagName') {
        // No-Op
      } else if (key === 'render') {
        currentComponent['renderView'] = component[key]
      } else if (currentComponent[key]) {
        throw new Error(`Key '${key}' not allowed in component`)
      } else currentComponent[key] = component[key]
    }
    return new currentComponent(component.tagName)
  }

  export function jsx(name, attributes, ...children) {
    return {name, attributes, children}
  }

  if (typeof module !== 'undefined') {
    module.exports.component = component
    module.exports.jsx = jsx
  }

})()
function jsx(name, attributes, ...children) {
  const element = document.createElement(name)

  if (typeof attributes === 'object' && attributes)
  for (let attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      if (attrName.substr(0, 3) === 'on-') {
        element.addEventListener(attrName.substr(3).toLowerCase(), attributes[attrName])
      } else {
        if (attrName === 'className') {
          element.setAttribute('class', attributes[attrName])
        } else {
          element.setAttribute(attrName, attributes[attrName])
        }
      }
    }
  }

  children.forEach(function(child) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else if (child.constructor.name === 'Array') {
      child.forEach(function(nestedChild) {
        if (typeof nestedChild === 'string') {
          element.appendChild(document.createTextNode(nestedChild))
        } else {
          element.appendChild(nestedChild)
        }
      })
    } else {
      element.appendChild(child)
    }
  })

  return element
}

function process(element) {
  // Processes the ref attributes

  element.refs = {}
  Array.prototype.forEach.call(element.querySelectorAll('[ref]'), function(child) {
    element.refs[child.getAttribute('ref')] = child
    child.removeAttribute('ref')
  })

  return element
}

module.exports = {jsx, process}
