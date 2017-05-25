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
import ButtonIcon from 'react-native-button';
import PopupDialog from 'react-native-popup-dialog';
import moment from 'moment';

export default class ShopScreen extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    const btnCol = config.BTN_COLOR;

    let btns = null;

    if( this.props.isBusy ) {
      btns = <View><ActivityIndicator size="large"/></View>;
    } else {
      btns = <View>
        <Text style={{textAlign:'center',padding:vw,fontSize:10}}>HEMATQU AKAN MEMBUKA WEBSITE ATAU APP BUKALAPAK. LOGIN DAN PERIKSA KERANJANG BELANJAMU YANG SUDAH TERISI OTOMATIS.</Text>
        <View style={{padding:vw}}>
          <Button
            onPress={()=>this.props.onSubmitDecision()}
            title="KIRIMKAN KE BUKALAPAK"
            color={btnCol}
            disabled={(this.props.numInCart==0)}
          />
        </View>
      </View>;
    }

    const inCart = this.props.numInCart+' ITEM DI KERANJANG';
    return (
      <View style={{flex:1,justifyContent:'center',paddingTop:54}}>
        <View style={{padding:3*vw}}>
          <Text style={{textAlign:'center'}}>
            HEMATQU AKAN MENGIRIM KERANJANG BELANJA KE AKUN BUKALAPAKMU
          </Text>
          <View style={{padding:vw}}>
            <Button
              onPress={()=>this.props.onAddAll()}
              title="MASUKAN SEMUA ITEM"
              color={btnCol}
              disabled={(this.props.items.length==0)}
            />
          </View>
          <Text style={{textAlign:'center'}}>
            ATAU MASUKAN SATU PERSATU DENGAN MENTAP KERANJANG
          </Text>
        </View>
        <View style={{flex:1}}>
          <FlatList
            keyExtractor={(item, index) => item._id}
            data={this.props.items}
            renderItem={row => this.renderRow(row.item,row.index)}
          />
        </View>            
        <View style={{padding:2*vw}}>
          <View style={{padding:3*vw,alignItems:'center'}}>
            <Text style={{fontWeight:'bold',textAlign:'center'}}>
              {inCart}
            </Text>
          </View>        
          {btns}
        </View>
      </View>
    );
  }

  renderRow(item,index) {
    const center = {justifyContent:'center',alignItems:'center',padding:2*vw};
    const imgUrl = item.img;
    const btnCol = config.BTN_COLOR;
    const itemId = item._id;
    const price = ''+item.price;
    const titleVal = item.titleVal.toUpperCase();

    let priceLine = <View><Text>Rp. {price}</Text></View>;
    let iconName = "cart-arrow-down";
    if( item.inCart ) {
      iconName = "close";
    }

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
          <Text style={{fontWeight:'bold'}}>{titleVal}</Text>
          <Text style={{fontSize:10}}>{item.name.toUpperCase()} @ {item.seller.toUpperCase()}</Text>
          {priceLine}
        </View>
        <View style={center}>
          <ButtonIcon onPress={()=>this.props.onToggle(index)}>
            <Icon name={iconName} size={30} />
          </ButtonIcon>
        </View>
      </View>
    );
  }

}