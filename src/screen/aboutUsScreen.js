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
import {vw} from '../platform';
import Icon from 'react-native-vector-icons/FontAwesome';
import BusyScreen from '../screen/busyScreen';

export default class AboutUsScreen extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  submitDecision(yes) {
    this.props.onSubmitDecission(yes);
  }

  render() {
    const btnCol = config.BTN_COLOR;

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:0}}>
        <View style={{padding:2*vw}}>
          <View style={{padding:5*vw,alignItems:'center'}}>
            <Icon name="hand-peace-o" size={30} />
            <Text />
            <Text style={{textAlign:'center'}}>
              APLIKASI HEMATQU DIBUAT UNTUK MENGIKUTI BUKALAPAK DEVELOPMENT COMPETITION 2017
            </Text>
            <Text />
            <Text style={{textAlign:'center'}}>
              TIM HEMATQU
            </Text>
            <Text style={{textAlign:'center',fontSize:10}}>
              LEONARDUS LITIK (081380834623) DAN
              FRIESCILLA SISCAYANTIE (082151537633)
            </Text>
            <Text />
            <Text>
            TEKNOLOGI
            </Text>
            <Text style={{textAlign:'center',fontSize:10}}>
              REACT NATIVE, NODEJS, FEATHERSJS, BUKALAPAK API, ONESIGNAL API
            </Text>
          </View>        
        </View>
      </View>
    );
  }
}