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

export default class InterestScreen extends Component {

  render() {
    if(this.props.isBusy) {
      return <BusyScreen />;
    }

    return (
      <View style={{flex:1,paddingTop:54}}>
        <View style={{padding:5*vw}}>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>
            DAFTAR PENGGUNA HEMATQU YANG MEMILIH PRODUK DARI LAPAKMU.
          </Text>
          <Text style={{textAlign:'center'}}>
            CEK DAFTAR BELANJA DAN BERIKAN PENAWARAN YANG LEBIH BAIK.
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
    const imgUrl = item.avatar;
    const name = item.name;
    const itemId = item._id;

    return (
      <View style={{flexDirection: 'row',
        borderBottomColor: 'gainsboro',
        borderBottomWidth: StyleSheet.hairlineWidth}}>
        <View style={center}>
          <Image
            style={{width: 10*vw, height: 10*vw}}
            source={{uri: imgUrl}}
          />
        </View>
        <View style={{flex:1,flexDirection: 'column',alignItems:'flex-start',justifyContent:'center'}}>
          <Text>{name}</Text>
        </View>
        <View style={center}>
          <ButtonIcon onPress={()=>this.props.onSelectItem(index)}>
            <Icon name="edit" size={30} />
          </ButtonIcon>
        </View>
        <View style={center}>
          <ButtonIcon onPress={()=>this.props.onSelectItem2(index)}>
            <Icon name="wechat" size={30} />
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
