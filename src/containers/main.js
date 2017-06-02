import React, { Component } from 'react';
import platform from '../platform';
import feathersLib from '../feathersLib';

import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import OneSignal from 'react-native-onesignal'; // Import package from node modules

class Main extends Component {
  constructor() {
    super();
    // this.state = {
    //   status:""
    // }
  }

  componentDidMount() {
    feathersLib.startConnection((status)=>{
      
      if( status == 'connected' ) {
        this.props.actions.setConnectionStatus(true);

        feathersLib.relogin()
        .then(user=>{
          this.props.actions.setConnectionStatus(true);
          this.props.actions.setLoginUser(user);
        })
        .catch(err=>{
          
          if(err.code == 401) {
            feathersLib.getApp().logout();
            this.props.actions.logoutUser();
            platform.historyReplace('launch');
          }
          
        });
        
        const itemService = feathersLib.getApp().service('items');
        itemService.on('patched', item => {
          this.props.actions.updateHomePage();
        });
        
      } else {
        this.props.actions.setConnectionStatus(false);
      }



      // this.setState({
      //   status:status
      // });
    });
  }

  componentWillMount() {
    OneSignal.addEventListener('ids', (device) => this.onIds(device));
    OneSignal.addEventListener('opened', (result)=>this.onOpened(result));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', (device) => this.onIds(device));
    OneSignal.removeEventListener('opened', (result)=>this.onOpened(result));
  }

  onIds(device) {
    if( device && device.userId && device.pushToken ) {
      const deviceId = device.userId;
      const pushToken = device.pushToken;
      this.props.actions.setOnesignalId(deviceId);
    }
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    
    // platform.historyPushByParam('newNotification',{detail:{
    //   msg:openResult.notification.payload.body
    // }});

    platform.historyReplace('launch');
  }

  render() {
    const children = this.props.children;
    return children;

    // if(this.state.status == "connected") {
    //   const children = this.props.children;
    //   return children;
    // }

    // if(this.state.status == "disconnected" || this.state.status == "error" ) {
    //   return <BlankScreen msg='KONEKSI INTERNET TERPUTUS' />;
    // }

    // return <BlankScreen />;
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);