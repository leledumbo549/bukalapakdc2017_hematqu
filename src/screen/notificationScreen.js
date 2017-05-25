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

export default class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  submitDecision(yes) {
    this.props.onSubmitDecission(yes);
  }

  render() {
    if( this.props.isBusy ) {
      return <BusyScreen />;
    }

    const btnCol = config.BTN_COLOR;

    let btns = (
      <View>
        <Text style={{fontWeight:'bold',textAlign:'center',padding:vw}}>NYALAKAN NOTIFIKASI?</Text>
        <View style={{padding:vw}}>
          <Button
            onPress={()=>this.submitDecision(true)}
            title="YA"
            color={btnCol}
            disabled={( !this.props.pushDaily && !this.props.pushPriceChange)}
          />
        </View>
        <View style={{padding:vw}}>
          <Button
            onPress={()=>this.submitDecision(false)}
            title="STOP NOTIFIKASI"
            color={btnCol}
          />
        </View>
      </View>
    );

    const rowStyle = {
      flexDirection:'row',
      borderBottomColor: 'gainsboro',
      borderBottomWidth: StyleSheet.hairlineWidth,
      padding:2*vw,
      justifyContent:'space-between',
      alignItems:'center'
    };

    return (
      <View style={{flex:1,paddingTop:54}}>
        <View style={{flex:1,padding:15*vw,alignItems:'center',
          justifyContent:'center',
          borderBottomColor: 'gainsboro',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}>
          <Icon name="clock-o" size={30} />
          <Text style={{textAlign:'center'}}>
            SELAMA 27 JAM 7 HARI WALAUPUN APP TIDAK AKTIF,
            HEMATQU AKAN MEMANTAU PERUBAHAN HARGA DI DAFTAR BELANJAMU.
          </Text>
        </View>
        <View style={rowStyle}>
          <View style={{flex:1}}>
            <Text style={{textAlign:'left',fontSize:10}}>
              KIRIMKAN PUSH NOTIFIKASI TOTAL BELANJA SETIAP HARI
            </Text>
          </View>
          <View>
            <Switch
              onValueChange={(value) => this.props.onToggleDaily(value)}
              value={this.props.pushDaily} />
          </View>
        </View>
        <View style={rowStyle}>
          <View style={{flex:1}}>
            <Text style={{textAlign:'left',fontSize:10}}>
              KIRIMKAN PUSH NOTIFIKASI KETIKA HARGA DI CATATAN BERUBAH
            </Text>
          </View>
          <View>
            <Switch
              onValueChange={(value) => this.props.onTogglePriceChange(value)}
              value={this.props.pushPriceChange} />
          </View>
        </View>
        
        {btns}
      </View>
    );
  }
}