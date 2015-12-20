describe 'vanilla-jsx', ->
  {jsx} = require('..')

  it 'returns HTMLElements', ->
    el = jsx('div', {})
    expect(el instanceof HTMLElement).toBe(true)
    expect(el.tagName).toBe('DIV')

  it 'sets attributes on elements', ->
    el = jsx('div', {a: 1, b: 'b', c: 'd'})
    expect(el.getAttribute('a')).toBe('1')
    expect(el.getAttribute('b')).toBe('b')
    expect(el.getAttribute('c')).toBe('d')

  it 'converts className to class', ->
    el = jsx('div', {className: 'something'})
    expect(el.getAttribute('class')).toBe('something')

  it 'adds event listeners', ->
    listener = jasmine.createSpy('jsx.listener')
    el = jsx('div', {'on-click': listener})
    el.dispatchEvent(new MouseEvent('click'))
    expect(listener).toHaveBeenCalled()

  it 'accepts null as attribute', ->
    expect ->
      jsx('div', null)
    .not.toThrow()

  it 'works well with nested children', ->
    el = jsx(
      'div',
      null,
      'ABC ',
      jsx(
        'span',
        null,
        'First ',
        jsx(
          'child',
          null,
          'First'
        ),
        jsx(
          'child',
          null,
          'Second'
        )
      ),
      jsx(
        'span',
        null,
        'Second'
      )
    )
    expect(el.outerHTML).toBe('<div>ABC <span>First <child>First</child><child>Second</child></span><span>Second</span></div>')
