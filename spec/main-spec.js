'use babel'

/** @jsx jsx */

import {component, jsx} from '../'

describe('Vanilla-JSX', function() {
  it('cries if no parameter is given', function() {
    expect(function() {
      component()
    }).toThrow()
  })
  it('cries if no renderView method is given', function() {
    expect(function() {
      component({})
    }).toThrow()
  })
  it('cries if invalid renderView method is given', function() {
    expect(function() {
      component({
        renderView: true
      })
    }).toThrow()
  })
  it('cries if renderView doesnt return valid JSX', function() {
    expect(function() {
      new (component({
        renderView: function() {
          return {}
        }
      }))().render()
    }).toThrow()
    expect(function() {
      new (component({
        renderView: function() {
          return null
        }
      }))().render()
    }).toThrow()
    expect(function() {
      new (component({
        renderView: function() {
          return false
        }
      }))().render()
    }).toThrow()
    expect(function() {
      new (component({
        renderView: function() {
          return []
        }
      }))().render()
    }).toThrow()
  })

  describe('element', function() {
    it('triggers render', function() {
      let triggered = false
      const Component = component({
        renderView: function() {
          triggered = true
          return (<div></div>)
        }
      })
      const inst = new Component()
      expect(triggered).toBe(false)
      inst.element
      expect(triggered).toBe(true)
    })
    it('gives zero parameters to render', function() {
      let argumentsCount = null
      const Component = component({
        renderView: function() {
          argumentsCount = arguments.length
          return (<div></div>)
        }
      })
      const inst = new Component()
      expect(argumentsCount).toBe(null)
      inst.element
      expect(argumentsCount).toBe(0)
    })
  })
  it('does not trigger render if its already rendered', function() {
    let triggered = 0
    const Component = component({
      renderView: function() {
        triggered++
        return (<div></div>)
      }
    })
    const inst = new Component()
    expect(triggered).toBe(0)
    inst.render()
    inst.element
    expect(triggered).toBe(1)
  })
  it('is an html element with correct nested children', function() {
    const Component = component({
      renderView: function() {
        return <div>
          <span>
            <a href="#">Hey</a>
          </span>
          <span>
            <a href="#">Yo</a>
          </span>
        </div>
      }
    })
    const inst = new Component()
    expect(inst.element.childNodes.length).toBe(2)
    expect(inst.element.childNodes[0].tagName).toBe('SPAN')
    expect(inst.element.childNodes[1].tagName).toBe('SPAN')
    expect(inst.element.childNodes[0].childNodes.length).toBe(1)
    expect(inst.element.childNodes[0].childNodes[0].tagName).toBe('A')
    expect(inst.element.childNodes[1].childNodes.length).toBe(1)
    expect(inst.element.childNodes[1].childNodes[0].tagName).toBe('A')
  })
  it('has correct attributes', function() {
    const Component = component({
      renderView: function() {
        return <div data-a="a" data-b="b"></div>
      }
    })
    const inst = new Component()
    expect(inst.element.hasAttribute('data-a')).toBe(true)
    expect(inst.element.getAttribute('data-a')).toBe('a')
    expect(inst.element.hasAttribute('data-b')).toBe(true)
    expect(inst.element.getAttribute('data-b')).toBe('b')
  })
  it('translates className attribute into class', function() {
    const Component = component({
      renderView: function() {
        return <div className="test"></div>
      }
    })
    const inst = new Component()
    expect(inst.element.className).toBe('test')
  })
})
