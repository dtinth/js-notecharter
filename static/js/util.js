
define(function(require) {

  var _ = require('lodash')

  var util = {
    each: function(sth, fn) {
      if (typeof sth === 'function') {
        return sth(fn)
      } else {
        var out
        _.each(sth, function(c, i) {
          if (fn(c, i) === false) {
            out = false
            return false
          }
        })
        return out
      }
    },
    first: function(iterable, predicate, defaultValue) {
      var out = defaultValue
      util.each(iterable, function(c, i) {
        if (predicate(c, i)) {
          out = c
          return false
        }
      })
      return out
    },
    last: function(iterable, predicate, defaultValue) {
      var out = defaultValue
      util.each(iterable, function(c, i) {
        if (predicate(c, i)) {
          out = c
        } else {
          return false
        }
      })
      return out
    }
  }

  util.find = util.first

  return util

})
