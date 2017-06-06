import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import SplashScreen from '../screen/splashScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';
import moment from 'moment';

class Launch extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true
    }
  }

  componentDidMount() {

    const user = this.props.stateLogin.user;

    if( !user ) return this.enterLogin();

    setTimeout(()=>{
      this.enterHome();
    },3000);
    
  }

  enterLogin() {
    platform.historyReplace('login');  
  }

  enterHome() {
    // platform.historyReplace('drawer');

    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) return platform.historyReplace('drawer');

    const reportService = feathersLib.getApp().service('notifications');
    const userId = this.props.stateLogin.user._id;
    const query = {
      $sort: { createdTime: -1 },
      $limit: 1,
      forUserId: userId
    };

    reportService.find({query})
    .then(result=>{
      if(result.total == 0) throw null;
      const reportId = result.data[0]._id;
      
      if( this.props.stateDevice.lastNotificationId == reportId ) throw null;

      const detail = result.data[0];
      this.props.actions.setLastNotificationId(reportId);
      platform.historyPushByParam('newNotification',{detail:detail});

    })
    .catch(err=>{
      if(err) console.warn(err);
      platform.historyReplace('drawer');
    });    
  }

  render() {
    return (
      <SplashScreen />
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login,
    stateDevice: state.Device,
    stateAppData: state.AppData
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
)(Launch);