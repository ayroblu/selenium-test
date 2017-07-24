const webdriver = require('selenium-webdriver')
const By = webdriver.By
const until = webdriver.until

class Page {
  constructor(driver, url, path=''){
    this.driver = driver
    this.url = url || 'http://localhost:3000'
    this.path = path
    this.exampleSelector = By.css('h1')
  }
  async setup(){
    this.driver.get(this.url + this.path)
    await this.driver.wait(until.elementLocated(this.exampleSelector), 3000)
  }
  async waitForButtons(){
    await this.driver.wait(until.elementLocated(By.css('div.answer')), 60000)
    return this.driver.findElement(By.css('div.answer')).getText()
  }
  getExampleText(){
    return this.driver.findElement(this.exampleSelector).getText()
  }
  getText(selectorText){
    return this.driver.findElement(By.css(selectorText)).getText()
  }
  getElement(selectorText){
    return this.driver.findElement(By.id(selectorText))
  }
}

module.exports = Page
