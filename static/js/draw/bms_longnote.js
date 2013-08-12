
define(function(require) {

  var _ = require('lodash')

  return function(desire) {

var doc = desire('doc')

var longNotes = []

function isLongNote(event) {
  return event.longNote
}

doc.watch(function(revision) {
  longNotes = []
  doc.level.eachChannel(function(events, channel) {
    var head = null
    _.each(_.filter(events, isLongNote), function(event) {
      if (head) {
        longNotes.push([head, event])
      } else {
        head = event
      }
    })
  })
  if (longNotes.length > 0) {
    console.log(longNotes)
  }
})

return function drawBMSLongnote(ctx) {


}

  }
  
})
