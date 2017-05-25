"use strict";

import * as types from '../actions/AppActions';

var initialState = {
	connectionStatus:false,
	onesignalId:false,
	drawerOpen:false,
  lastNotificationId:null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_DEVICE:
      return Object.assign({}, state, action.newData);
    case types.RESET_DEVICE:     
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};
