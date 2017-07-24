var cancelButton = document.querySelector('button.cancel')
var changeButton = document.querySelector('button.change')

var div = document.createElement('div')
div.className = 'answer'
changeButton.onclick = ()=>{
  div.innerText = 'change'
  document.body.appendChild(div)
}
cancelButton.onclick = ()=>{
  div.innerText = 'cancel'
  document.body.appendChild(div)
}
