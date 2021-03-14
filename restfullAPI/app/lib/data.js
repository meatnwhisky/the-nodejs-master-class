//storing and editing data
//dependencies 
const fs = require('fs')
const path = require('path')
const helpers = require('./helpers')

//container to the module to be exported
var lib = {}
lib.baseDir = path.join(__dirname, '/../.data/') //making it to one clean path


//write data to a file
//data will be going to file itself
lib.create = function (dir, file, data, callback) {

  //__dirname - current location
  //open file for writing 
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {

      //convert to a string 
      var stringData = JSON.stringify(data)
      fs.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) { callback(false) }
            else {
              callback('could not close a file')
            }
          })
        }
        else callback('error writing to new file')
      })

    } else {
      callback('could not create new file', err)
    }
  })//wx - open file for writing
}

//read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', function (err, data) {
    if (!err && data) {
      var parsedData = helpers.parsJsonToObject(data)
      callback(false, parsedData)
    }
    else {
      callback(err, data)
    }
    // if (err) { console.log('error while reading the file: ', err) }
    // else {
    //   console.log(JSON.stringify(data))
    // }
  })
}

lib.update = function (dir, file, data, callback) {
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      var stringData = JSON.stringify(data)
      fs.ftruncate(fileDescriptor, function (err) {
        if (!err) {
          //write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function () {
            if (!err) {
              fs.close(fileDescriptor, function (err) {
                if (!err) {
                  callback(false)
                } else {
                  callback('error closing a file', err)
                }
              })
            }
            else { callback('some error', err) }
          })
        }
        else
          (callback('error truncating file', err))
      })
    }
    callback(err)
  })
}

lib.delete = function (dir, file, callback) {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
    if (!err) { callback(false) }
    else { callback('error deleting file', err) }
  })
}

module.exports = lib