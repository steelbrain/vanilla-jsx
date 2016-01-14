'use babel';

(function() {
  'use strict'

  class Component {
    constructor() {
      this._element = null
    }
    get element() {
      if (this._element === null) {
        this.render()
      }
      return this._element
    }
    render(...params) {

    }
    renderAsString() {

    }
    dispose() {
      this._element = null
    }
  }

  export function component(component) {
    if (typeof component !== 'object') {
      throw new Error('Invalid component params provided')
    }
    if (typeof component.renderView !== 'function') {
      throw new Error('renderView must be a function')
    }
    const currentComponent = Object.create(Component)
    for (let key in component) {
      if (key === 'render') {
        currentComponent.prototype['renderView'] = component[key]
      } else if (currentComponent[key]) {
        throw new Error(`Key '${key}' not allowed in component`)
      } else currentComponent.prototype[key] = component[key]
    }
    return currentComponent
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
