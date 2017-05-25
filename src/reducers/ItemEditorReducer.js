"use strict";

import * as types from '../actions/AppActions';
import _ from 'lodash';

var initialState = {
  title:'',
  products:[],
  editedItem:null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGOUT_USER:
      return Object.assign({}, state, initialState);
    case types.SET_EDITOR_DATA:
      return Object.assign({}, state, action.newData);      
    case types.ADD_EDITOR_PRODUCTS:
    	const obj = Object.assign({}, state);
    	obj.products = obj.products.concat(action.products);
      return obj;  
    default:
      return state;
  }
};
