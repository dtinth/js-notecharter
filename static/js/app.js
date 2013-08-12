
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var view = desire('view')
var doc = desire('doc')

var config = desire('config')

function run() {

  _.each(config.drawProcedures, function(proc) {
    view.addDrawProcedure(desire(proc.component), proc.priority)
  })
  
  view.renderTo(config.container)

  _.each(config.binders, function(component) {
    desire(component).bind()
  })

  _.each(config.toolbarSections, function(element, component) {
    desire(component).renderTo(config.toolbar.find(element))
  })

  desire('handler.insert').handle()
  desire('mode_handler').watch()

}

return { run: run }

  }

})
