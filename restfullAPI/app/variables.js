//homework assignment #2

/**
 * A difference between const var and let is as following:
 * 
 * const will be used when a variable value should not be reassigned, for example in case of importing a config.js data or while creating a variable as a birth date for example
 * 
 * let is only accessible in a block it was defined, it's limited to that block only and can not be accessed or modified outside of it.
   best use case of let is it inside loops(imo) 
 *
 * var is accessible in scope it was declared and also can be modified. Its not recommended to use var because of this reason, however if there is a need in variable that can be accessible in and out of defined scope - will use var

 * hoisting: variable declarations are being processed (by js compiler) before the code is being executed.
 */


const config = require('./config')

function foo() {

  var array = [1, 2, 3, 4, 5, 6]

  for (let i = 0; i < array.length; i++) {
    console.log(array[i])
  }
  //'i' is not accessible here

  array = [11, 22, 33, 44]
  //array can be modified

}

