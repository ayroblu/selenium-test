const assert = require('assert')
const path = require('path')
const fs = require('fs')
const webdriver = require('selenium-webdriver')

const app = require('./app')
const Page = require('./Page')
const runPageTest = require('./pageTest')
const verifyScreenshot = require('./screenshotHandler')

// function checkScreenshot -> if exists read it, if !== then open page
app.listen(9324, ()=>{
  console.log('Example app listening on port 9324!')
})

describe('Just a page', ()=>{
  let driver, page, port

  before(function(){
    this.timeout(4000)
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
    this.timeout(5000)
    page = new Page(driver, 'https://benlu.nz', '/')
    return page.setup()
  })

  it('check exists', async ()=>{
    await runPageTest(driver, 'benlu.nz')
  }).timeout(100000)
})
