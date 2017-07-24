const assert = require('assert')
const path = require('path')
const fs = require('fs')
const webdriver = require('selenium-webdriver')

const app = require('./app')
const Page = require('./Page')
const verifyScreenshot = require('./screenshotHandler')

// function checkScreenshot -> if exists read it, if !== then open page
app.listen(9324, ()=>{
  console.log('Example app listening on port 9324!')
})

describe('Just a page', ()=>{
  let driver, page, port

  before(function(){
    this.timeout(100000)
    driver = new webdriver.Builder()
      //.withCapabilities(webdriver.Capabilities.firefox())
      .withCapabilities(webdriver.Capabilities.chrome())
      .build()

    return driver.getWindowHandle()
  })

  after(function(){
    return driver.quit()
  })

  beforeEach(function(){
    this.timeout(1000000)
    page = new Page(driver, 'https://benlu.nz', '/')
    return page.setup()
  })

  it('check exists', async ()=>{
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
    //await new Promise(y=>setTimeout(y, 30000))
  }).timeout(100000)
})
