
define(function(require) {

  var $ = require('jquery')
  var when = require('when')

  return function(desire) {

    return {
      load: function() {
        return when($.ajax({ url: '/data.json' }))
      },
      save: function(data) {
        return when($.ajax({ url: '/save', type: 'POST',
          data: { data: JSON.stringify(data) } }))
      }
    }

  }

})
