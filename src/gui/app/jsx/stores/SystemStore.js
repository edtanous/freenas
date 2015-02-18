// Widget Data Flux Store
// ----------------

"use strict";

var _            = require("lodash");
var EventEmitter = require("events").EventEmitter;

var FreeNASDispatcher = require("../dispatcher/FreeNASDispatcher");
var FreeNASConstants  = require("../constants/FreeNASConstants");

var ActionTypes  = FreeNASConstants.ActionTypes;
var CHANGE_EVENT = "change";

var _systemInfoData = {};



var SystemStore = _.assign( {}, EventEmitter.prototype, {

    emitChange: function(changeType) {
      this.emit( CHANGE_EVENT );
    }

  , addChangeListener: function( callback ) {
      this.on( CHANGE_EVENT, callback );
    }

  , removeChangeListener: function( callback ) {
      this.removeListener( CHANGE_EVENT, callback );
    }

  , getSystemInfo: function(name) {
      return _systemInfoData[name];
    }


});

SystemStore.dispatchToken = FreeNASDispatcher.register( function( payload ) {
  var action = payload.action;

  switch( action.type ) {

    case ActionTypes.RECEIVE_SYSTEM_INFO_DATA:
      _systemInfoData[action.systemInfoName] = action.systemInfo;
      console.log(_systemInfoData);
      SystemStore.emitChange();
      break;

    default:
      // No action
  }
});

module.exports = SystemStore;