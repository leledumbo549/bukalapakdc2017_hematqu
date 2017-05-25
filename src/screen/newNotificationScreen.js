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

import {vw} from '../platform';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import platform from '../platform';
import ButtonIcon from 'react-native-button';


export default class NewNotificationScreen extends Component {
  next() {
    // const detail = this.props.detail;
    // this.props.actions.setLastNotificationId(detail._id);
    platform.historyReplace('launch');
  }

  render() {
    const detail = this.props.detail;
    const msg = detail.msg.toUpperCase();
      
    return (
      <View style={{flex:1,paddingTop:0}}>
        <View style={{flex:1,padding:15*vw,justifyContent:'center',alignItems:'center'}}>
          <View style={{alignItems:'center'}}>
            <Image
              source={require('../logo.png')}
            />
            <Text style={{textAlign:'center',padding:5*vw}}>
              APLIKASI PENGHEMAT BELANJA BULANAN
            </Text>        
          </View>
          <Text />
          <Text style={{textAlign:'center',fontWeight:'bold'}}>
            {msg}
          </Text>
        </View>
        <View style={{padding:1*vw}}>        
          <ButtonIcon onPress={()=>this.next()}>
            <View style={{alignItems:'center',backgroundColor:'crimson',padding:1*vw}}>
              <Icon name="sign-in" size={30} color='white'/>
              <Text style={{color:'white'}}>MASUK KE APLIKASI</Text>
            </View>
          </ButtonIcon>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
