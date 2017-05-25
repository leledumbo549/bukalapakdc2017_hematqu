"use strict";

import * as types from '../actions/AppActions';
import _ from 'lodash';

var initialState = {
  categories:[],
  searchProducts:[],
  items:[],
  reports:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGOUT_USER:
      return Object.assign({}, state, initialState);
    case types.SET_APP_DATA:     
      return Object.assign({}, state, action.newData);
    case types.REMOVE_APP_DATA:
    	if(action.kind == 'item' ) {
    		const newItems = _.remove(state.items, (n) => {
				  return n._id != action.itemId;
				});

				return Object.assign({}, state, {
					items:newItems
				});
    	}

      
    default:
      return state;
  }
};
