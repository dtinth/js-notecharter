
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var clipboard = { }
var notify = desire('notify')

clipboard.bind = function() {

  var container = $('<div class="clipboard-container"></div>').appendTo('body')

  function setTrap(text) {
    var textarea = $('<textarea></textarea>')[0]
    textarea.value = text
    container.append(textarea)
    textarea.focus()
    textarea.select()
    setTimeout(function() {
      $(textarea).remove()
    }, 100)
  }

  $(window).on('keydown', function(e) {
    if (!e.ctrlKey && !e.metaKey) return
    if (e.which == 67 || e.which == 88) {
      var data = clipboard.oncopy()
      if (!data) return
      setTrap(data)
    } else if (e.which == 86) {
      setTrap('')
    }
  })
  $(window).on('copy', function(e) {
    notify('copied!')
    killElement(e)
  })
  $(window).on('cut', function(e) {
    try {
      notify('cutted!')
      clipboard.oncut()
    } finally {
      killElement(e)
    }
  })
  $(window).on('paste', function(e) {
    try {
      notify('pasted!')
      clipboard.onpaste(e.originalEvent.clipboardData.getData('text'))
    } finally {
      killElement(e)
    }
  })

  function killElement(e) {
    var target = e.target
    if (!$(target.parentNode).is('.clipboard-container')) return
    setTimeout(function() {
      $(target).remove()
    }, 0)
  }

}

clipboard.oncopy = function() {
}
clipboard.onpaste = function(data) {
  notify('paste!! ' + data)
}
clipboard.oncut = function() {
  notify('cut!!')
}

return clipboard

  }
  
})
