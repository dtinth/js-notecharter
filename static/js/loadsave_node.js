
define(function(require) {

  return function(desire) {

    var fs = window.fs
    var when = require('when')

    var saveFilename

    return {
      load: function() {
        return when.promise(function(resolve, reject) {
          var input = document.createElement('input')
          input.type = 'file'
          input.style.display = 'none'
          input.onchange = function() {
            resolve(input.value)
            input.parentNode.removeChild(input)
          }
          document.body.appendChild(input)
          input.click()
        }).then(function(filename) {
          saveFilename = filename
          return when.promise(function(resolve, reject) {
            fs.readFile(filename, 'utf-8', function(err, data) {
              if (err) return reject(err)
              return resolve(data)
            })
          })
        }).then(JSON.parse)
      },
      save: function(data) {
        return when.promise(function(resolve, reject) {
          if (saveFilename) return resolve(saveFilename)
          var input = document.createElement('input')
          input.type = 'file'
          input.setAttribute('nwsaveas', '')
          input.style.display = 'none'
          input.onchange = function() {
            resolve(input.value)
            input.parentNode.removeChild(input)
          }
          document.body.appendChild(input)
          input.click()
        }).then(function(filename) {
          saveFilename = filename
          return when.promise(function(resolve, reject) {
            fs.writeFile(filename, JSON.stringify(data), 'utf-8', function(err) {
              if (err) return reject(err)
              return resolve('ok')
            })
          })
        })

      }
    }

  }
  
})
