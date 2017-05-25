const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const authentication = require('feathers-authentication/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');
const platform = require('./platform');

import config from './config';

// npm i feathers@2.1.1 feathers-socketio@1.5.2 feathers-authentication@0.7.12 feathers-hooks@1.8.1 socket.io-client
// npm i react-native-router-flux@3.38.0 react-redux redux redux-thunk --save

window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });

module.exports.startConnection = startConnection;
module.exports.getApp = getApp;
module.exports.relogin = relogin;
module.exports.loginByEmail = loginByEmail;

function getApp() {
  return app;
}

function startConnection(cb) {
  const options = { transports: ['websocket'], forceNew: true };
  socket = io(config.API_ADDRESS,options);

  cb('connecting');

  app = feathers()
    .configure(socketio(socket))
    .configure(hooks())
    .configure(authentication({ storage: platform.getStorage() }));

  app.io.on('connect', () => {
    cb('connected');
  });

  app.io.on('connect_error', () => {
    cb('error');
  });

  app.io.on('disconnect', () => {
    cb('disconnected');
  });
}

function relogin() {
  return app.authenticate()
    .then(user=>{    
      return user.data;
    });
}

function loginByEmail(email,password) {
  return app.authenticate({ 
      type: 'local', 
      'email': email, 
      'password':password
    })
    .then(user=>{    
      return user.data;
    });
}