
requirejs.config({
  baseUrl: 'js',
  packages: [
    { name: 'when', location: '../bower_components/when', main: 'when' },
    { name: 'jquery', location: '../bower_components/jquery', main: 'jquery' },
    { name: 'lodash', location: '../bower_components/lodash', main: 'lodash' },
    { name: 'node-uuid', location: '../bower_components/node-uuid', main: 'uuid' },
    { name: 'itjs', location: '../bower_components/it.js', main: 'it' },
    { name: 'desire', location: '../bower_components/desire', main: 'desire' }
  ],
  shim: {
    'itjs': { exports: 'It' }
  }
})

define(function(require) {

  var when = require('when')
  var Desire = require('desire')

  var tests = require('./tests')
  var getConfig = require('./config')
  var config = getConfig()

  var components = config.components

  $(function() {

    if ($('body').hasClass('test')) {
      tests.run(components)
    } else {
      var desire = new Desire(components)
      desire('app').run()
    }

  })

})











