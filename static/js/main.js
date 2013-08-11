
requirejs.config({
  baseUrl: 'js',
  packages: [
    { name: 'when', location: '../bower_components/when', main: 'when' },
    { name: 'jquery', location: '../bower_components/jquery', main: 'jquery' },
    { name: 'lodash', location: '../bower_components/lodash', main: 'lodash' },
    { name: 'node-uuid', location: '../bower_components/node-uuid', main: 'uuid' },
    { name: 'itjs', location: '../bower_components/it.js', main: 'it' }
  ],
  shim: {
    'itjs': { exports: 'It' }
  }
})

define(function(require) {

  var when = require('when')
  var Desire = require('./desire')

  var desire = new Desire()

  desire.register({

    'app': require('./app'),
    'doc': require('./doc'),

    'container': Desire.value($('#main')),
    'toolbar': Desire.value($('#toolbar')),

    'modes': require('./modes'),
    'mode_handler': require('./mode_handler'),
    'mode_switcher': require('./mode_switcher'),
    'grid_switcher': require('./grid_switcher'),
    'zoom_indicator': require('./zoom_indicator'),
    
    'view': require('./view'),

    'theme': require('./theme'),
    'columns': require('./columns'),

    'dirty': require('./dirty'),
    'draw.measure': require('./draw/measure'),
    'draw.grid': require('./draw/grid'),
    'draw.object': require('./draw/object'),
    'object_style': require('./object_style'),

    'view.scroll': require('./view_scroll'),
    'view.mouse': require('./view_mouse'),
    'keyboard': require('./keyboard')

  })

  $(function() {
    desire('app')
  })

})

