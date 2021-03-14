
const { setTimeout } = require('timers')
var _data = require('../lib/data')
var specials = `/œ∑´®†¥¨ˆøπåß∂ƒ©˙∆˚¬…≈ç√∫˜µ≤≥≥≥«æ˜ ˜˜˜˜∫∫˜µ≈ç√∫˜µ≤≥∞§¢£™£∞§¶•ªº'`

//fs functions
var pirpleTest = {
  //@TODO delete
  // _data.create('test', 'newTestFile', { 'foo': 'poo' }, function (err) {
  //   console.log('error was like this: ', err)
  // })

  //@TODO delete
  // _data.read('test', 'newTestFile', function (err, data) {
  //   console.log(`error: ${err} | data: ${data}`)
  // })

  //@TODO delete
  // _data.update('test', 'newTestFile', { 'lala': 'land' }, function (err) {
  //   console.log(`error: ${err}`)
  // })

  //@TODO delete
  // _data.delete('test', 'newTestFile', function (err) {
  //   console.log(`error: ${err}`)
  // })
}
var test = {

  testObject: {
    start: 1,
    end: 6,
    arr: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 'stop']
  },
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
  arrowFunctionsAndThis() {
    var context = this // in order to user printResult function
    var obj = {
      i: 42,
      time: 1000,
      arrowFunc: function () {
        setTimeout(() => {
          context.printResult('arrowFunctionsAndThis', `this inside the arrow function: ${this.i} ( //should have value)`)
        }, this.time);
      },
      regularFunc: function () {
        setTimeout(function () {
          context.printResult('regularFunctionsAndThis', `this inside the regular function: ${this.i} ( //should be undefined)`)
        }, this.time);
      }
    }
    obj.arrowFunc()
    obj.regularFunc()
  },
  loopsOfAllKinds() {

    for (const key in this.testObject) {
      if (Object.hasOwnProperty.call(this.testObject, key)) {
        const element = this.testObject[key];
        console.log(element)

      }
    }
    this.testObject.arr.forEach(element => {
      console.log(element)
    });
    // for (const key in object) {
    //   if (Object.hasOwnProperty.call(object, key)) {
    //     const element = object[key];
    //   }
    // }
    // for (const iterator of this.testObject) {

    // }
    // return false
  }

}
module.exports = test