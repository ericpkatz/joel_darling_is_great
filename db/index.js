var mongoose = require('mongoose');
var Promise = require('bluebird');

var barSchema = mongoose.Schema({
  name: String
});

var Bar = mongoose.model('bar', barSchema);

var fooSchema = mongoose.Schema({
  bar: { type: mongoose.Schema.Types.ObjectId, ref: 'bar' }
});

var Foo = mongoose.model('foo', fooSchema);

var _conn;
module.exports = {
  connect: function(){
    if(_conn)
      return _conn;

    _conn = new Promise(function(resolve, reject){
      mongoose.connect(process.env.CONN, function(err){
        if(err)
          return reject(err);
        resolve();
      });
    });
    return _conn;
  },
  models: {
    Foo: Foo,
    Bar: Bar
  }

}
