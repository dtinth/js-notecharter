
define(function(require) {

  var $ = require('jquery')

  return function(desire) {

var modes = desire('modes')
var dirty = desire('dirty')

var icons = {
      select: 'icon-hand-up',
      insert: 'icon-pencil',
      remove: 'icon-eraser'
    }

function renderTo(container) {

  modes.MODES.forEach(function(mode) {

    var el = $('<span class="tb mode mode-' + mode + '"></span>')
      .html('<i class="' + icons[mode] + '"></i>')
      .click(function() {
        modes.mode = mode
        dirty.check()
      })
      .appendTo(container)

    modes.watch(function(value) {
      el.toggleClass('active', value === mode)
    })

  })

}

return { renderTo: renderTo }

  }

})
