import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import InterestScreen from '../screen/interestScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';
import _ from 'lodash';

class InterestList extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true,
      data:[]
    }
  }

  componentDidMount() {
    const connected = this.props.stateDevice.connectionStatus;

    if( connected ) {
      this.updateList();
    }
  }

  updateList() {
    const uid = this.props.stateLogin.user.uid;
    //console.warn(uid);
    bukalapakLib.getInterestList(uid)
      .then(arr=>{
        // console.warn(arr);
        if( arr ) {
          this.setState({
            isBusy:false,
            data:arr
          });
        }
      })
      .catch(err=>console.warn(err));    
  }

  componentWillUnmount() {
  }

  selectItem(index) {
    const connected = this.props.stateDevice.connectionStatus;

    if( !connected ) {
      return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    }

    const uid = this.props.stateLogin.user.uid;
    const interest = this.state.data[index];
    const interestId = interest._id;
    const param = {
      uid,
      interestId
    };
    // console.warn(JSON.stringify(param));

    platform.historyPushByParam('interestitems',param); 
  }

  selectItem2(index) {
    const connected = this.props.stateDevice.connectionStatus;

    if( !connected ) {
      return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    }

    const user = this.props.stateLogin.user;

    const interest = this.state.data[index];
    const param = {
      userIdToListen:interest._id,
      senderId:user._id,
      senderName:user.name,
      senderAvatar:user.avatar
    };
    // console.warn(JSON.stringify(param));

    platform.historyPushByParam('chat',param); 
  }

  render() {    
    return (
      <InterestScreen
        data={this.state.data}
        isBusy={this.state.isBusy}
        onSelectItem={(index)=>this.selectItem(index)}
        onSelectItem2={(index)=>this.selectItem2(index)}
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
)(InterestList);