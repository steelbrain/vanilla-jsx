'use strict';
'use babel';

(function () {
  'use strict';

  let escapeHTML = null;

  class Component {
    constructor() {
      this._element = null;
    }
    get element() {
      if (this._element === null) {
        this.render();
      }
      return this._element;
    }
    render() {
      let element = null;

      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (params.length === 1) {
        element = this.renderView(params[0]);
      } else if (params.length === 2) {
        element = this.renderView(params[0], params[1]);
      } else if (params.length === 3) {
        element = this.renderView(params[0], params[1], params[2]);
      } else if (params.length === 4) {
        element = this.renderView(params[0], params[1], params[2]);
      } else {
        element = this.renderView.apply(this, params);
      }
      element = createDOMElements(element);
      if (this._element && this._element.parentNode) {
        this._element.parentNode.replaceChild(element, this._element);
      }
      this._element = element;
    }
    renderToString() {
      if (escapeHTML === null) {
        escapeHTML = require('escape-html');
      }
    }
    dispose() {
      this._element = null;
    }
  }

  function createDOMElements(element) {
    if (typeof element !== 'object' || element === null || !Array.isArray(element.children)) {
      throw new Error('Invalid element provided', element);
    }
    const domElement = document.createElement(element.name);
    if (element.attributes !== null) {
      for (let key in element.attributes) {
        if (key === 'className') {
          key = 'class';
        }
        const value = element.attributes[key];
        domElement.setAttribute(key, typeof value === 'function' ? value() : value);
      }
    }
    const childrenLength = element.children.length;
    if (childrenLength) {
      for (let i = 0; i < childrenLength; ++i) {
        const nestedChildren = [].concat(element.children[i]);
        const nestedChildrenLength = nestedChildren.length;
        if (nestedChildrenLength === 1) {
          const nestedChild = nestedChildren[0];
          domElement.appendChild(typeof nestedChild === 'object' ? nestedChild : document.createTextNode(nestedChild));
        } else {
          for (let n = 0; n < nestedChildrenLength; ++n) {
            const nestedChild = nestedChildren[n];
            domElement.appendChild(typeof nestedChild === 'object' ? nestedChild : document.createTextNode(nestedChild));
          }
        }
      }
    }
    domElement.refs = {};
    const childrenRefs = domElement.querySelectorAll('[ref]');
    const childrenRefsLength = childrenRefs.length;
    if (childrenRefs) {
      for (let i = 0; i < childrenRefsLength; ++i) {
        const child = childrenRefs[i];
        domElement.refs[child.getAttribute('ref')] = child;
        child.removeAttribute('ref');
      }
    }
    return domElement;
  }

  function component(component) {
    if (typeof component !== 'object') {
      throw new Error('Invalid component params provided');
    }
    if (typeof component.renderView !== 'function') {
      throw new Error('renderView must be a function');
    }
    class CurrentComponent extends Component {}
    for (let key in component) {
      if (key === 'render') {
        CurrentComponent.prototype['renderView'] = component[key];
      } else if (CurrentComponent[key]) {
        throw new Error(`Key '${ key }' not allowed in component`);
      } else CurrentComponent.prototype[key] = component[key];
    }
    return CurrentComponent;
  }

  function jsx(name, attributes) {
    for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }

    return { name: name, attributes: attributes, children: children };
  }

  if (typeof module !== 'undefined') {
    module.exports.component = component;
    module.exports.jsx = jsx;
  } else if (typeof window !== 'undefined') {
    window.vanilla = { component: component, jsx: jsx };
  } else if (typeof self !== 'undefined') {
    self.vanilla = { component: component, jsx: jsx };
  }
})();