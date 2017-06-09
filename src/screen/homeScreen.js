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

export default class HomeScreen extends Component {

  render() {
    if(this.props.isBusy) {
      return <BusyScreen />;
    }

    const arr = this.props.items;
    const btnCol = config.BTN_COLOR;
    
    let ns = 'NOTIFICATION ON';
    let nsCol = 'green';

    if( !this.props.notificationStatus ) {
      ns = 'NOTIFICATION OFF';
      nsCol = 'red';
    }

    let content = <View style={{flex:1}} />

    if( arr.length == 0 ) {
      content = (
        <View style={{flex:1,padding:6*vw,alignItems:'center',justifyContent:'center'}}>
          <Icon name="shopping-cart" size={30} />
          <Text style={{textAlign:'center'}}>
            BUAT DAFTAR BELANJA BULANANMU DISINI. MULAILAH DENGAN TAP TAMBAH CATATAN.
          </Text>              
        </View>
      );
    } else {
      
      let subinfo = 'NYALAKAN PUSH NOTIFIKASI UNTUK MEMASTIKAN HEMATQU SELALU MEMANTAU HARGA WALAUPUN APP DIMATIKAN';
      if( this.props.notificationStatus ) subinfo = 'LAPAK DIPANTAU 24 JAM 7 HARI. KAMU AKAN MENERIMA PUSH NOTIFIKASI KALAU HARGA BERUBAH';

      const diff = this.props.curPrice - this.props.prevPrice;
      const diffStr = 'RP. ' + Math.abs(diff);
      const prevStr = 'RP. ' + this.props.prevPrice;      
      const info = 'TOTAL BELANJA RP. '+this.props.curPrice;
      
      let info2 = null;
      if( diff > 0 ) {
        info2 = <Text style={{textAlign:'center',fontSize:10,color:'red'}}>
          LEBIH MAHAL DARI TOTAL BELANJA SEBELUMNYA SEBESAR {prevStr}
        </Text>;     
      } else if( diff < 0 ) {
        info2 = <Text style={{textAlign:'center',fontSize:10,color:'green'}}>
          LEBIH MURAH DARI TOTAL BELANJA SEBELUMNYA SEBESAR {prevStr}
        </Text>;
      } else {
        info2 = <Text style={{textAlign:'center',fontSize:10}}>
          SAMA DENGAN TOTAL BELANJA SEBELUMNYA SEBESAR {prevStr}
        </Text>;
      }
      
      content = (
        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <FlatList
              keyExtractor={(item, index) => item._id}
              data={arr}
              renderItem={row => this.renderRow(row.item)}
            />
          </View>            
          <View style={{padding:10*vw}}>
            <Text style={{textAlign:'center',fontWeight:'bold'}}>
              {info}
            </Text>
            {info2}
            <Text />
            <Text style={{textAlign:'center',color:nsCol}}>
              {ns}
            </Text>
            <Text style={{textAlign:'center',fontSize:10}}>
              {subinfo}
            </Text>
          </View>
        </View>
      );     
    }


    return (
      <View style={{flex:1,paddingTop:54}}>
        {content}
        <View>
          <View>
            <View style={{alignSelf: 'stretch',padding:1*vw}}>
              <ButtonIcon onPress={()=>this.props.onClick1()}>
                <View style={{alignItems:'center',backgroundColor:'crimson',padding:2*vw}}>
                  <Icon name="pencil-square-o" size={30} color='white'/>
                  <Text style={{color:'white'}}>TAMBAH CATATAN</Text>
                </View>
              </ButtonIcon>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1,padding:1*vw}}>
              <ButtonIcon onPress={()=>this.props.onClick2()}>
                <View style={{alignItems:'center',backgroundColor:'crimson',padding:2*vw}}>
                  <Icon name="clock-o" size={30} color='white'/>
                  <Text style={{color:'white'}}>NOTIFIKASI</Text>
                </View>
              </ButtonIcon>
            </View>
            <View style={{flex:1,padding:1*vw}}>
              <ButtonIcon onPress={()=>this.props.onClick4()}>
                <View style={{alignItems:'center',backgroundColor:'crimson',padding:2*vw}}>
                  <Icon name="wechat" size={30} color='white'/>
                  <Text style={{color:'white'}}>CHAT</Text>
                </View>
              </ButtonIcon>
            </View>
            <View style={{flex:1,padding:1*vw}}>
              <ButtonIcon onPress={()=>this.props.onClick3()}>
                <View style={{alignItems:'center',backgroundColor:'crimson',padding:2*vw}}>
                  <Icon name="cart-arrow-down" size={30} color='white'/>
                  <Text style={{color:'white'}}>BELANJA</Text>
                </View>
              </ButtonIcon>
            </View>
          </View>
        </View>

      </View>
    );
  }

  renderRow(item) {
    const center = {justifyContent:'center',alignItems:'center',padding:2*vw};
    const imgUrl = item.img;
    const btnCol = config.BTN_COLOR;
    const itemId = item._id;
    const price = ''+item.price;
    const titleVal = item.titleVal.toUpperCase();

    const mm = moment.unix(item.createdAt);
    
    let mmStr = 'LAST UPDATE '+mm.format("D MMMM, HH:mm")+'';
    let col = 'green';

    if( item.checking ) {
      mmStr = 'UPDATING..';
      col = 'red';
    }

    const diff = item.price - item.prevPrice;
    const delta = ' ' + Math.abs(diff);    
    let ico = 'arrow-up';
    let colp = 'red';

    if( diff < 0 ) {
      ico = 'arrow-down';
      colp = 'green';
    }

    let priceLine = <View><Text>Rp. {price}</Text></View>;
    if( diff != 0 ) {
      priceLine = <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}>
        <View><Text>Rp. {price} </Text></View>
        <View>              
          <Icon name={ico} color={colp}/>
        </View>
        <View>              
          <Text style={{color:colp}}>{delta}</Text>
        </View>
      </View>
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
          <Text style={{fontSize:10,color:col}}>{mmStr.toUpperCase()}</Text>
          <Text style={{fontSize:10}}>{item.name.toUpperCase()} @ {item.seller.toUpperCase()}</Text>
          {priceLine}

        </View>
        <View style={center}>
          <ButtonIcon onPress={()=>this.props.onEditItem(itemId)}>
            <Icon name="edit" size={30} />
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
