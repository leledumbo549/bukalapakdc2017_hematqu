import React, { Component } from 'react';

// ** redux wrapper go here **

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

import AppRouter from './appRouter';

import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('HEMATQU');

import { SET_DEVICE } from './actions/AppActions';

import SplashScreen from './screen/splashScreen';


// import filter from 'redux-storage-decorator-filter';

// engine = filter(engine, [
//   'Login',
//   'AppData'
// ], [
//   'Device'
// ]);

const storageMiddleware = storage.createMiddleware(engine,[SET_DEVICE]);
const reducer = storage.reducer(combineReducers(reducers));
//const reducer = combineReducers(reducers);
const store = createStore(reducer,
  applyMiddleware(
    thunkMiddleware,
    storageMiddleware
  )
);  

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true
    }
  }

  componentDidMount() {
    const load = storage.createLoader(engine);
    load(store)
      .then((newState) => {
        // console.warn(JSON.stringify(newState.Device));
        this.setState({isBusy:false});
      })
      .catch(() => {
        this.setState({isBusy:false});
      });
  }

  render() {
    if( this.state.isBusy ) return <SplashScreen />;

    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}