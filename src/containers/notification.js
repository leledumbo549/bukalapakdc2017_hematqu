import React, { Component } from 'react';
import NotificationScreen from '../screen/notificationScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false,
      pushDaily:true,
      pushPriceChange:true
    }
  }

  componentDidMount() {
  }

  submitDecission(yes) {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) {
      return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    }

    this.setState({
      isBusy:true
    });
    
    const onesignalId = this.props.stateDevice.onesignalId;
    const items = this.props.stateAppData.items;
    let total = 0;
    for(let i=0;i<items.length;i++) {
      total += items[i].price;
    }

    const users = feathersLib.getApp().service('users');
    const userId = this.props.stateLogin.user._id;

    let promise = null;

    if( yes ) {
      promise = users.patch(userId,{totalPrice:total,onesignalId:onesignalId,
        pushDaily:this.state.pushDaily,
        pushPriceChange:this.state.pushPriceChange
      });
    } else {
      promise = users.patch(userId,{totalPrice:total,onesignalId:'',
        pushDaily:false,
        pushPriceChange:false
      });
    }

    promise
    .then(user=>{
      return this.props.actions.updateHomePage()
    })
    .then(user=>{
      this.setState({
        isBusy:false
      });
      platform.historyPop();
    })
    .catch(err=>{
      this.setState({
        isBusy:false
      });
      platform.alertOK('','Status notifikasi belum berhasil disimpan. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    })
      
  }

  toggleDaily() {
    let newState = !this.state.pushDaily;
    this.setState({
      pushDaily:newState
    });_
  }

  togglePriceChange() {
    let newState = !this.state.pushPriceChange;
    this.setState({
      pushPriceChange:newState
    });_
  }

  render() {
    return (
      <NotificationScreen 
        pushDaily={this.state.pushDaily}
        onToggleDaily={value=>{
          this.setState({
            pushDaily:value
          })
        }}
        pushPriceChange={this.state.pushPriceChange}
        onTogglePriceChange={value => {
          this.setState({
            pushPriceChange:value
          })
        }}
        isBusy={this.state.isBusy} 
        onSubmitDecission={yes=>this.submitDecission(yes)}/>
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login,
    stateAppData: state.AppData,
    stateDevice: state.Device
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
)(Notification);