'use strict'

function jsx(name, attributes, ...children) {
  const element = document.createElement(name)

  if (typeof attributes === 'object' && attributes)
  for (let attrName in attributes) {
    if (attributes.hasOwnProperty(attrName)) {
      if (attrName.substr(0, 2) === 'on') {
        element.addEventListener(attrName.substr(2).toLowerCase(), attributes[attrName])
      } else if (attrName.substr(0, 1) === '$') {
        element[attrName.substr(1)] = attributes[attrName]
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
