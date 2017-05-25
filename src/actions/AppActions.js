export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SET_DEVICE = 'SET_DEVICE';
export const SET_APP_DATA = 'SET_APP_DATA';
export const REMOVE_APP_DATA = 'REMOVE_APP_DATA';

export const SET_EDITOR_DATA = 'SET_EDITOR_DATA';
export const ADD_EDITOR_PRODUCTS = 'ADD_EDITOR_PRODUCTS';

import feathersLib from '../feathersLib';

export function setReports(reports) {
  return {
    type: SET_APP_DATA,
    newData: {
      reports
    }    
  };
}

export function setEditorData(newData) {
  return {
    type: SET_EDITOR_DATA,
    newData
  };
}

export function addEditorProducts(products) {
  return {
    type: ADD_EDITOR_PRODUCTS,
    products
  };
}

export function updateHomePage() {
  return (dispatch,getState) => {

    const items = feathersLib.getApp().service('items');
    const users = feathersLib.getApp().service('users');
    const userId = getState().Login.user._id;

    const query = {
      $sort: { createdAt: -1 },
      $limit: 100
    };

    return items.find({query})
      .then(result=>{
        dispatch({
          type: SET_APP_DATA,
          newData: {
            items: result.data
          }
        });
        return users.get(userId)
      })
      .then(result=>{
        dispatch({
          type: LOGIN_USER,
          user: result
        });
      });

  }
}

export function logoutUser(user) {
  return {
    type: LOGOUT_USER
  };
}

export function setLoginUser(user) {
  return {
    type: LOGIN_USER,
    user
  };
}

export function setOnesignalId(onesignalId) {
  return {
    type: SET_DEVICE,
    newData: {
      onesignalId
    }    
  };
}

export function setConnectionStatus(connectionStatus) {
  return {
    type: SET_DEVICE,
    newData: {
      connectionStatus
    }    
  };
}

export function setDrawerOpen(drawerOpen) {
  return {
    type: SET_DEVICE,
    newData: {
      drawerOpen
    }    
  };
}

export function setLastNotificationId(lastNotificationId) {
  return {
    type: SET_DEVICE,
    newData: {
      lastNotificationId
    }    
  };
}

export function setCategories(categories) {
  return {
    type: SET_APP_DATA,
    newData: {
    	categories: categories	
    }    
  };
}

export function setSearchProducts(searchProducts) {
  return {
    type: SET_APP_DATA,
    newData: {
      searchProducts: searchProducts
    }    
  };
}

export function setItems(items) {
  return {
    type: SET_APP_DATA,
    newData: {
      items: items
    }    
  };
}

export function removeItem(itemId) {
  return {
    type: REMOVE_APP_DATA,
    kind: 'item',
    itemId: itemId
  };
}