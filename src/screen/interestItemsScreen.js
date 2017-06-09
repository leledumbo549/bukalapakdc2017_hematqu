import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';

import config from '../config';
import {vw} from '../platform';
import Icon from 'react-native-vector-icons/FontAwesome';
import BusyScreen from '../screen/busyScreen';
import ButtonIcon from 'react-native-button';
import PopupDialog from 'react-native-popup-dialog';
import moment from 'moment';

export default class InterestItemsScreen extends Component {

  render() {
    if(this.props.isBusy) {
      return <BusyScreen />;
    }

    return (
      <View style={{flex:1,paddingTop:54}}>
        <View style={{padding:5*vw}}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>
            CEK PRODUK TERMURAH DI CATATAN BELANJA
          </Text>
          <Text style={{textAlign:'center'}}>
            APAKAH KAMU BISA LEBIH MURAH?
          </Text>
        </View>
        <View style={{flex:1}}>
          <FlatList
            keyExtractor={(item, index) => item._id}
            data={this.props.data}
            renderItem={row => this.renderRow(row.item,row.index)}
          />
        </View>            
      </View>
    );
  }

  renderRow(item,index) {
    const center = {justifyContent:'center',alignItems:'center',padding:2*vw};
    const imgUrl = item.img;
    const price = 'RP. '+item.price;
    const titleVal = item.titleVal.toUpperCase();

    return (
      <View style={{flexDirection: 'row',
        borderBottomColor: 'gainsboro',
        borderBottomWidth: StyleSheet.hairlineWidth}}>
        <View style={center}>
          <Image
            style={{width: 20*vw, height: 20*vw}}
            source={{uri: imgUrl}}
          />
        </View>
        <View style={{flex:1,flexDirection: 'column',alignItems:'flex-start',justifyContent:'center'}}>
          <Text>{titleVal}</Text>
          <Text style={{fontSize:10}}>{item.name.toUpperCase()} @ {item.seller.toUpperCase()}</Text>
          <View><Text style={{fontWeight:'bold'}}>TERMURAH: {price}</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
