const jsdom = require('jsdom')
const { JSDOM } = jsdom
const dom = new JSDOM('<html><body></body></html>')

global.document = dom.window.document
global.window = dom.window
global.navigator = dom.window.navigator

const { Code } = require('../test/index.esm.js')

describe('Test block essential functionalities:', () => {
  const codeBlock = new Code()

  const i18n = {
    locale: 'en-US',
    rtl: 'auto'
  }

  it('render() should return an node', () => {
    expect(codeBlock.render(i18n)).toHaveClass('freedom-editor-blocks')
  })

  it('render() should return an node with content, when passing in data', () => {
    const blockData = {
      type: codeBlock.constructor.name,
      data: {
        code: 'Testing'
      }
    }

    const renderedBlock = codeBlock.render(i18n, blockData)

    expect(renderedBlock.querySelector('code').textContent).toContain(blockData.data.code)
  })

  it('save() should return null when the block is empty', () => {
    const block = codeBlock.render(i18n)

    expect(codeBlock.save(block)).nothing()
  })

  it('save() should return JSON when the block is not empty', () => {
    const block = codeBlock.render(i18n)
    const codeField = block.querySelector('code')
    codeField.textContent = 'Testing'

    expect(codeBlock.save(block)).toBeTruthy()
  })
})
