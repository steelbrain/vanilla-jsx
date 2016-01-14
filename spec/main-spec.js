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
})
