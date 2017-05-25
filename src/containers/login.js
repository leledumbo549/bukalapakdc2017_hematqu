import React, { Component } from 'react';
import LoginScreen from '../screen/loginScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

	enterHome(user,pass) {

    const device = this.props.stateDevice;
    if( !device.connectionStatus ) {      
      return platform.alertOK('','Tidak ada sambungan internet. Pastikan paket data atau wifi tersedia.');
    }

    this.setState({
      isBusy:true
    });

    bukalapakLib.getToken(user,pass)
    .then(token=>{
      return bukalapakLib.linkToServer(user,pass,token);
    })    
    .then(success=>{
      if(!success) throw "linkToServer error";
      console.warn('linkToServer success');
      
      return feathersLib.loginByEmail(user,pass);
    })
    .then(user=>{
      this.props.actions.setLoginUser(user);
      this.setState({
        isBusy:false
      });

      platform.historyReplace('drawer');
    })
    .catch(err=>{
      console.warn(err);
      this.setState({
        isBusy:false
      });
      // show notification error
      platform.alertOK('','Login belum berhasil. Cobalah beberapa saat lagi.');
    });
	}

  enterRegister() {
    platform.openURL('https://www.bukalapak.com');
  }

  render() {
    return (
      <LoginScreen isBusy={this.state.isBusy} onSubmitUserPass={(user,pass)=>this.enterHome(user,pass)} onRegister={()=>this.enterRegister()}/>
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login,
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
)(Login);