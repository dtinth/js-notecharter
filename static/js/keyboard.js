
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var modeHandler = desire('mode_handler')

var keys = { }

function register(def) {
  _.assign(keys, def)
}

function bind() {

  $(window).on('keydown', function(e) {

    var key = e.which

    if (keys[key]) {
      return keys[key](key, e)
    } else {
      return modeHandler.fire('keydown', key, e)
    }
    
  })

}

return { bind: bind, register: register }

  }

})
