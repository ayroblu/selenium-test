const assert = require('assert')

const Page = require('./Page')
const verifyScreenshot = require('./screenshotHandler')

async function runPageTest(driver, name){
  const needsChecking = await verifyScreenshot(driver, 'benlu.nz')
  if (needsChecking){
    const figure = new Page(driver, 'http://localhost:9324')
    await figure.setup()
    // wait until an element appears
    const response = await figure.waitForButtons()
    if (response === 'change') {
      needsChecking.saveScreenshot()
      return
    }
    assert.equal(response, 'cancel')
  }
}

module.exports = runPageTest
