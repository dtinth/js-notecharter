
define(function(require) {
  
  return function(desire) {

var theme = desire('theme')

return function getStyle(event) {

  var color = theme.objectColorByChannel[event.channel]

  if (event.longNote) color = theme.longNote

  return {
    text: '',
    color: color
  }

}

  }

})
