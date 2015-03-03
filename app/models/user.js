var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: true,

  initialize: function(){
    var password = this.get('password');
    bcrypt.hash(password, null, null, function(err, hash) {
      this.set('password', hash);
    }.bind(this));
  },

  checkPassword: function(password, callback){
    bcrypt.compare(password, this.get('password'), callback);
  }
});

module.exports = User;
