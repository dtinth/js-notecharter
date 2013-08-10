
define(function(require) {

  return {
    first: function(array, predicate, defaultValue) {
      for (var i = 0; i < array.length; i ++) {
        if (predicate(array[i], i)) return array[i]
      }
      return defaultValue
    },
    last: function(array, predicate, defaultValue) {
      var result = defaultValue
      for (var i = 0; i < array.length; i ++) {
        if (predicate(array[i], i)) result = array[i]
        else break
      }
      return result
    }
  }

})
