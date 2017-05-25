"use strict";

import * as types from '../actions/AppActions';

var initialState = {
  user:false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGOUT_USER:
      return Object.assign({}, state, initialState);
    case types.LOGIN_USER:     
      return Object.assign({}, state, {
        user:action.user
      });
    default:
      return state;
  }
};
