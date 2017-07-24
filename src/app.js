const path = require('path')
const fs = require('fs')
const express = require('express')
const rimraf = require('rimraf')

const dir = path.resolve(__dirname, 'public')

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir)
}

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use('/static', express.static(dir))

app.get('/', function (req, res) {
  res.render('index', {})
})

//app.listen(9324, ()=>{
//  console.log('Example app listening on port 9324!')
//})
module.exports = app
