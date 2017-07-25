const webdriver = require('selenium-webdriver')
const By = webdriver.By
const until = webdriver.until

class Page {
  constructor(driver, url, path=''){
    this.driver = driver
    this.url = url || 'http://localhost:3000'
    this.path = path
  }
  async setup(){
    return this.driver.get(this.url + this.path)
    // It already waits for page load, actually don't need to do anything
    //await this.driver.wait(until.elementLocated(this.exampleSelector), 3000)
  }
  async waitForButtons(){
    await this.driver.wait(until.elementLocated(By.css('div.answer')), 60000)
    return this.driver.findElement(By.css('div.answer')).getText()
  }
  getText(selectorText){
    return this.driver.findElement(By.css(selectorText)).getText()
  }
  getElement(selectorText){
    return this.driver.findElement(By.id(selectorText))
  }
}

module.exports = Page
