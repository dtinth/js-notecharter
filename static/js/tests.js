

/*jshint expr:true*/
/*global it, describe, beforeEach, chai, context, sinon*/
define(function(require) {

  var expect = chai.expect
  var Desire = require('desire')

  var Viewport = require('viewport')
  var models = require('models')

  var Level = models.Level

  function run(components) {

var desire

beforeEach(function() {
  desire = new Desire(components)
})

describe('models.createEvent', function() {

  it('should create unique ids', function() {
    var a = models.createEvent()
    var b = models.createEvent()
    expect(a.id).to.not.equal(b.id)
  })

  it('should create a new event with row', function() {
    expect(models.createEvent().row).to.exist
  })

  it('should let we override properties', function() {
    expect(models.createEvent({ row: 5 }).row).to.equal(5)
  })
  
  it('should let we set up properties', function() {
    expect(models.createEvent({ test: 'yes' }).test).to.equal('yes')
  })

})

describe('models.Level', function() {

  var level
  
  beforeEach(function() {
    level = new Level()
  })

  context('with 2 events', function() {

    var a, b

    beforeEach(function() {
      a = models.createEvent({ row: 1 })
      b = models.createEvent({ row: 2 })
      level.addEvent(a)
      level.addEvent(b)
    })

    it('#addEvent should add event to the level and #eachEvent should loop through them', function() {
      var out = []
      level.eachEvent(function(e) {
        out.push(e)
      })
      expect(out.length).to.equal(2)
      expect(out[0]).to.not.equal(out[1])
    })

    it('#eachEvent should stop when return false', function() {
      var out = []
      level.eachEvent(function(e) {
        out.push(e)
        return false
      })
      expect(out.length).to.equal(1)
    })
    
  })
  

})


describe('Viewport', function() {

  it('#resize should set width and height', function() {
    var viewport = new Viewport()
    viewport.resize(123, 456)
    expect(viewport.width).to.equal(123)
    expect(viewport.height).to.equal(456)
  })

  it('#zoomIn should change by one step', function() {
    var steps = [1.5, 2, 2.5, 3, 4]
    var viewport = new Viewport()
    steps.forEach(function(size) {
      viewport.zoomIn()
      expect(viewport.zoom).to.equal(steps.shift())
    })
  })

  it('#zoomOut should change by one step', function() {
    var steps = [0.75, 0.5]
    var viewport = new Viewport()
    steps.forEach(function(size) {
      viewport.zoomOut()
      expect(viewport.zoom).to.equal(steps.shift())
    })
  })
  
})

describe('dirty', function() {
  
  var dirty
  var object
  var watcher, anotherWatcher

  beforeEach(function() {
    dirty = desire('dirty')
    object = { test: 1, another: 1 }
    watcher = dirty.watch(function() { return object.test })
    anotherWatcher = dirty.watch(function() { return object.another })
  })

  describe('::watch', function() {
    
    it('should fire the callback immediately', function() {
      var spy = sinon.spy()
      watcher(spy)
      expect(spy.calledOnce).to.be.true
      expect(spy.calledWith(1, undefined)).to.be.true
    })

    it('should fire callback when things change after ::check', function() {
      var spy = sinon.spy()
      watcher(spy)
      object.test = 5
      expect(spy.calledOnce).to.be.true
      expect(spy.calledWith(1, undefined)).to.be.true
      dirty.check()
      expect(spy.calledTwice).to.be.true
      expect(spy.calledWith(5, 1)).to.be.true
    })

    it('should fire callbacks separately', function() {
      var spy = sinon.spy()
      var spy2 = sinon.spy()
      var spy3 = sinon.spy()
      var spy4 = sinon.spy()
      watcher(spy)
      anotherWatcher(spy4)
      object.test = 5
      dirty.check()
      watcher(spy2)
      object.test = 7
      object.another = 2
      dirty.check()
      watcher(spy3)
      expect(spy.callCount).to.equal(3)
      expect(spy2.callCount).to.equal(2)
      expect(spy3.callCount).to.equal(1)
      expect(spy4.callCount).to.equal(2)
    })

  })

  describe('::always', function() {
    it('should always run function when ::check is called', function() {
      var spy = sinon.spy()
      dirty.always(spy)
      dirty.check()
      dirty.check()
      dirty.check()
      expect(spy.callCount).to.equal(4)
    })
  })

})

describe('modes', function() {
  
  it('::watch should watch for changes', function() {
    var spy = sinon.spy()
    var modes = desire('modes')
    var dirty = desire('dirty')
    modes.watch(spy)
    expect(spy.callCount).to.equal(1)
    expect(spy.calledWith('select', undefined)).to.be.true
    modes.mode = 'insert'
    dirty.check()
    expect(spy.callCount).to.equal(2)
    expect(spy.calledWith('insert', 'select')).to.be.true
  })

})




window.runMochaTest()

  }

  return { run: run }

})
