import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import ReportScreen from '../screen/reportScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';

class Report extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

  componentDidMount() {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) return;

    const userId = this.props.stateLogin.user._id;

    const query = {
      $sort: { createdTime: -1 },
      $limit: 30,
      forUserId: userId
    };

    const reportService = feathersLib.getApp().service('notifications');
    reportService.find({query})
    .then(result=>{
      this.props.actions.setReports(result.data);
    })
    .catch(err=>{
      console.warn(err);
    });
  }

  removeReport(index) {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) return;

    const userId = this.props.stateLogin.user._id;

    const reportService = feathersLib.getApp().service('notifications');    
    reportService.remove(index)
    .then(result=>{
      const query = {
        $sort: { createdTime: -1 },
        $limit: 30,
        forUserId: userId
      };

      return reportService.find({query})  
    })    
    .then(result=>{
      this.props.actions.setReports(result.data);
    })
    .catch(err=>{
      console.warn(err);
    }); 
  }

  selectReport(index) {
    const reports = this.props.stateAppData.reports;
    let detail = null;
    for(let i=0;i<reports.length;i++) {
      const rep = reports[i];
      if( rep._id == index ) {
        detail = Object.assign({},rep);
        break;
      }
    }

    if( detail )
      platform.historyPushByParam('important',{detail:detail});  

    // const reportService = feathersLib.getApp().service('notifications');
    // reportService.patch(index,{unread:false})
    // .then(result=>{
    //   platform.historyPushByParam('reportDetail',{detail:result});  
    // })
    // .catch(err=>{

    // });
    
  }

  render() {
    const arr = this.props.stateAppData.reports.slice();
    return (
      <ReportScreen 
        isBusy={this.state.isBusy}
        onSelectReport={(index)=>this.selectReport(index)} 
        onRemoveReport={(index)=>this.removeReport(index)} 
        reports={arr}
        />
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
)(Report);