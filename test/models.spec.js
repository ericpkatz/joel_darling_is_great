var expect = require('chai').expect;
var db = require('../db');
var Foo = db.models.Foo;
var Bar = db.models.Bar;

describe('Foo', function(){
  var foo;
  beforeEach(function(done){
    db.connect()
      .then(function(){
        var bar = new Bar({name: 'bazz'});
        return bar.save();
      })
      .then(function(bar){
        var foo = new Foo({bar: bar._id});
        return foo.save();
      })
      .then(function(foo){
        return Foo.findById(foo._id).populate('bar');
      })
      .then(function(_foo){
        foo = _foo;
        console.log(foo);
        done();
      }, done);
  });

  it('can be nested', function(){
    expect(foo.bar.name).to.equal('bazz');
  });

});
