describe('Tests', ()=>{
  it('does nothing', ()=>{
    console.log('hi')
    return new Promise(y=>setTimeout(y, 100000))
  }).timeout(3000000)
})
