const path = require('path')
const fs = require('fs')
const resemble = require('node-resemble-js')

//const ssdir = path.join(__dirname, '__screenshots__')
const ssdir = path.resolve('__screenshots__')
const dir = path.join(__dirname, 'public')
if (!fs.existsSync(ssdir)){
  fs.mkdirSync(ssdir)
}

async function takeScreenshot(driver, name){
  const data = await driver.takeScreenshot()
  const base64Data = data.replace(/^data:image\/png;base64,/,"")
  return {
    pathname: path.join(ssdir, name+(name.endsWith('.png') ? '' : '.png')),
    base64Data,
    name: name+(name.endsWith('.png') ? '' : '.png'),
    driver,
  }
}
async function checkScreenshot(screenshot){
  if (!fs.existsSync(screenshot.pathname)){
    return saveScreenshot(screenshot)
  }
  const oldScreenshot = fs.readFileSync(screenshot.pathname, 'base64')
  if (oldScreenshot === screenshot) {
    return
  }
  fs.writeFileSync(path.join(dir, 'pre.png'), oldScreenshot, 'base64')
  fs.writeFileSync(path.join(dir, 'post.png'), screenshot.base64Data, 'base64')
  const diff = await new Promise(y=>(
    resemble(path.join(dir, 'pre.png')).compareTo(path.join(dir, 'post.png'))
      .ignoreColors().onComplete(y)
  ))
  console.log(diff)
  if (parseFloat(diff.misMatchPercentage) < 1) return
  diff.getDiffImage().pack().pipe(fs.createWriteStream(path.join(dir, 'diff.png')));
  return true
}
function saveScreenshot(screenshot){
  fs.writeFileSync(screenshot.pathname, screenshot.base64Data, 'base64')
}

async function verifyScreenshot(driver, name){
  const screenshot = await takeScreenshot(driver, name)
  const result = await checkScreenshot(screenshot)
  if (!result) return null
  return {
    screenshot
  , saveScreenshot: ()=>saveScreenshot(screenshot)
  }
}

module.exports = verifyScreenshot
