import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import bukalapakLib from './bukalapakLib';

class Info extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true,
      deviceId:"",
      user:""
    }
  }

  componentDidMount() {
    bukalapakLib.loginByBukalapak('leonarduslitik@gmail.com','durenjayad549')
    .then(result=>{
      this.setState({
        user:JSON.stringify(result)
      });
    });
  }

  componentWillMount() {
    OneSignal.addEventListener('ids', (device) => this.onIds(device));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', (device) => this.onIds(device));
  }

  onIds(device) {
    if( device && device.userId && device.pushToken ) {
      const userId = device.userId;
      const pushToken = device.pushToken;
      this.setState({
        deviceId:userId
      });
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>INFO:</Text>
        <Text>{this.state.deviceId}</Text>
        <Text>{this.state.user}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

export default Info;