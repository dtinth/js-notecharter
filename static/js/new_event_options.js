
define(function(require) {
  
  return function(desire) {

function newEventOptions(options, e) {
  if (options.channel == 'BPM') {
    var bpm = parseFloat(window.prompt('BPM = ?'))
    if (!bpm) throw new Error('invalid BPM given')
    options.value = bpm
  }
  if (e.shiftKey) {
    options.longNote = true
  }
  return options
}

return newEventOptions
    
  }

})
