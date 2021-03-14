

var specials = `/œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº'`

var test = {


  printResult(name, result) {
    console.log("__________________________________\n")
    console.log(`function :${name} \n\nresult: ${typeof (result) == 'object' ? JSON.stringify(result) : result}\n`)
    console.log("__________________________________\n")
  },

  symbolInObject() {
    var y = Symbol('secret symbol')
    var x = Symbol('secret symbol')
    var obj = { i: 40, [y]: 'my symbol yay' }
    obj[x] = "shh this is a secret"
    this.printResult('symbol', JSON.stringify(obj))
  },

  closureCustomUrl() {
    const that = this
    function url(urlDomain) {
      return (urlPath) => {
        var customUrl = `https://www.${urlPath}.${urlDomain}`
        that.printResult('closureTest', customUrl)
      }
    }
    var com = url('com')
    var il = url('co.il')
    com('google/images')
    com('google/test')
    il('yNet')
    il('nrg')
  },

  //make object iterable
  symbolIteratorGenerator() {
    var abcRu = {
      *[Symbol.iterator]() {
        for (let i = this.start; i <= this.finish; i++) {
          yield this.consonants[i];
        }
      },
      consonants: ['⟨б⟩', '⟨в⟩', '⟨г⟩', '⟨д⟩', '⟨ж⟩', '⟨з⟩', '⟨к⟩', '⟨л⟩', '⟨м⟩', '⟨н⟩', '⟨п⟩', '⟨р⟩', '⟨с⟩', '⟨т⟩', '⟨ф⟩', '⟨х⟩'],
      start: 5,
      finish: 10
    }
    var someConsonantsRu = [...abcRu]
    console.log(someConsonantsRu) // result: ["⟨з⟩","⟨к⟩","⟨л⟩","⟨м⟩","⟨н⟩","⟨п⟩"]


    this.printResult('symbolIteratorGenerator', someConsonantsRu)
  },
  looOoops() {
    return false
  }

}
module.exports = test