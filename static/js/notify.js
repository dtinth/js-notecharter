
define(function(require) {

  var $ = require('jquery')
  
  return function(desire) {
    
function make(text) {
  var el = $('<div class="notify"></div>')
  el.text(text)
  el.appendTo('#popups')
  return {
    element: el,
    done: function() {
      setTimeout(function() {
        el.hide('slow')
      }, 2000)
    },
    text: function(text) {
      return el.text(text)
    }
  }
}

function notify(text) {
  var item = make(text)
  item.done()
}

notify.progress = function(promise, text, finishedText) {
  var item = make(text)
  promise
  .then(
    function() { item.text(finishedText) },
    function(error) { item.text('Error!'); console.error(error) }
  )
  .ensure(function() { item.done() })
}

return notify

  }
  
})
