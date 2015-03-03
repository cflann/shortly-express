var db = require('../config');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: true,

  initialize: function(params){
    // if (params.hasOwnProperty('password')) {
    //   this.savePassword(params.password);
    // }
  },

  checkPassword: function(password, callback){
    bcrypt.compare(password, this.get('password'), function(err, match) {
      callback(match);
    });
  },

  savePassword: function(password){
    return bcrypt.hashAsync(password, null, null);//, function(err, hash){
    //   this.set('password', hash);
    //   resolve;
    // }.bind(this));
  }
});

module.exports = User;
