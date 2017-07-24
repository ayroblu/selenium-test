describe('Tests', ()=>{
  it('does nothing', ()=>{
    return new Promise(y=>setTimeout(y, 1000))
  }).timeout(3000)
})
