/**
 * Request handlers
 */

const _data = require('./data')
const helpers = require('./helpers')

let handlers = {}

//figure what method requested
handlers.users = function (data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete']
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback)
  }
  else {
    callback(405)
  }
}


handlers._users = {};

/**
 * @param {{
    "firstName":"Amme",
    "lastName":"Smith",
    "phone":"5551323443",
    "password": "lalaPass234",
    "tosAgreement": true
}} data 
 * @param {*} callback 
 */
//require f l name, phone password tosAgreement
handlers._users.post = function (data, callback) {
  console.log(JSON.stringify(data))
  //check payload of user
  var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false
  var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false
  var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false
  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false
  var tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? data.payload.tosAgreement : false

  if (firstName && lastName && phone && password && tosAgreement) {
    _data.read('users', phone, function (err, data) {
      if (err) {

        //hash the password
        var hashPassword = helpers.hash(password)

        if (hashPassword) {

          var userObject = {
            'firstName': firstName,
            'lastName': lastName,
            'phone': phone,
            'hashedPassword': hashPassword,
            'tosAgreement': true
          }

          //store the user
          _data.create('users', phone, userObject, function (err) {
            if (!err) { callback(200) }
            else (console.log(err))
            callback(500, { 'Error': 'Could not create a user ' })
          })

        } else {
          //user is already exist
          callback(400, { 'Error': 'Couldnt hash password' })
        }
      }
      else {
        callback(500, { 'Error': 'User with this number already exist' })
      }

    })
  }
  else (callback(400, { 'Error': 'Missing required fields' }))
}
//users get

//@TODO only let an authenticated user access their object
handlers._users.get = function (data, callback) {
  //get the phone number is valid
  var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false
  console.log(data.queryStringObject)
  if (phone) {
    //err,data... the data is what we got from file? 
    _data.read('users', phone, function (err, data) {
      if (!err && data) {
        //remove the hashed password from the user object
        delete data.hashedPassword
        callback(200, data) //data thats coming back
      }
      else { callback(400) }
    })
  }
  else { callback(400, { 'Error': 'Missing phone number' }) }
}
//required data: phone
//optional data: rest of the data
//at least one must br specified
//let authenticated user update their object
handlers._users.put = function (data, callback) {
  //check for the required field
  var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false
  //check for the optional fields

  var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false
  var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false

  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false

  //error if the phone is invalid
  if (phone) {
    if (firstName || lastName || password) {
      console.log(firstName, phone)
      _data.read('users', phone, function (err, userData) {
        if (!err && userData) { //Update user data
          if (firstName) {
            userData.firstName = firstName
          }
          if (lastName) {
            userData.lastName = lastName
          }
          if (password) {
            userData.hashedPassword = helpers.hash(password)
          }
          //store updated user
          _data.update('users', phone, userData, function (err) {
            if (!err) {
              callback(200)
            }
            else { callback(500, { 'Error': 'Could not update the user', err }) }
          })
        }
      })
    }
  }
  else {
    callback(400, { 'Error': 'Missing required field' })
  }
}


handlers._users.delete = function (data, callback) {

}



handlers.ping = function (data, callback) {
  callback(200)
}

handlers.testHandler = function (data, callback) { //gets data from chosenHandler function
  callback(403, { 'name': 'my test handler ;)' })
}
handlers.notFound = function (data, callback) {
  callback(404)
}

module.exports = handlers