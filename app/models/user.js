var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: true,

  initialize: function(){
  },

  checkPassword: function(password, callback){
    bcrypt.compare(password, this.get('password'), callback);
  },

  savePassword: function(password, callback){
    bcrypt.hash(password, null, null, function(err, hash){
      this.set('password', hash);
      this.save().then(callback);
    }.bind(this));
  }
});

module.exports = User;
