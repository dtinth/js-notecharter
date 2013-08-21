
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
    },
    minmax: function(a, b, c, fn) {
      return c(a) < c(b) ? fn(a, b) : fn(b, a)
    },
    toArray: function(iterable) {
      var out = [ ]
      util.each(iterable, function(c, i) {
        out.push(c)
      })
      return out
    }
  }

  util.find = util.first

  return util

})
