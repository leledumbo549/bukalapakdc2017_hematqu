import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  TextInput,
  Switch,
} from 'react-native';

import config from '../config';
import platform,{vw} from '../platform';
import Icon from 'react-native-vector-icons/FontAwesome';
import BusyScreen from '../screen/busyScreen';
import feathersLib from '../feathersLib';

class LogoutScreen extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

  confirmLogout() {
    this.setState({
      isBusy:true
    });

    feathersLib.getApp().logout();
    this.props.actions.logoutUser();

    setTimeout(()=>{
      platform.historyReplace('launch');
    },5000);    
    
  }

  render() {
    const btnCol = config.BTN_COLOR;

    let btns = null;

    if( this.state.isBusy ) {
      btns = <View><ActivityIndicator size="large"/></View>;
    } else {
      btns = <View>
        <Text style={{fontWeight:'bold',textAlign:'center',padding:vw}}>LANJUTKAN LOGOUT?</Text>
        <View style={{padding:vw}}>
          <Button
            onPress={()=>this.confirmLogout()}
            title="YA"
            color={btnCol}
          />
        </View>        
      </View>;
    }

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:0}}>
        <View style={{padding:2*vw}}>
          <View style={{padding:10*vw,alignItems:'center'}}>
            <Icon name="sign-out" size={30} />
            <Text style={{textAlign:'center'}}>
              HEMATQU AKAN TERUS MEMANTAU PERUBAHAN HARGA DI DAFTAR BELANJAMU,
              DAN MENGIRIM NOTIFIKASI KETIKA HARGA BERUBAH.
            </Text>
          </View>        
          {btns}
        </View>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login,
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
)(LogoutScreen);