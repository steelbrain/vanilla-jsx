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
      let element = null
      if (params.length === 1) {
        element = this.renderView(params[0])
      } else if (params.length === 2) {
        element = this.renderView(params[0], params[1])
      } else if (params.length === 3) {
        element = this.renderView(params[0], params[1], params[2])
      } else if (params.length === 4) {
        element = this.renderView(params[0], params[1], params[2])
      } else {
        element = this.renderView.apply(this, params)
      }
      if (this._element && this._element.parentNode) {
        this._element.parentNode.replaceChild(element, this._element)
      }
      this._element = element
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
  } else if (typeof window !== 'undefined') {
    window.vanilla = {component, jsx}
  } else if (typeof self !== 'undefined') {
    self.vanilla = {component, jsx}
  }

})()
