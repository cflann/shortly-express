var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: true,

  initialize: function(params){
    this.savePassword(params.password);
  },

  checkPassword: function(password, callback){
    bcrypt.compare(password, this.get('password'), callback);
  },

  savePassword: function(password){
    bcrypt.hash(password, null, null, function(err, hash){
      this.set('password', hash);
      this.save();
    }.bind(this));
  }
});

module.exports = User;
