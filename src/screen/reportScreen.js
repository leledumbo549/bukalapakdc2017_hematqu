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
import moment from 'moment';
import ButtonIcon from 'react-native-button';

export default class ReportScreen extends Component {
  render() {
    
    if(this.props.isBusy) {
      return <BusyScreen />;
    }

    let data = this.props.reports;
    return (
      <View style={{flex:1,paddingTop:54}}>
        <View>
          <Text style={{textAlign:'center',padding:6*vw}}>
            DAFTAR NOTIFIKASI PERUBAHAN HARGA
          </Text>          
        </View>
        <View style={{flex:1}}>
          <FlatList
            keyExtractor={(item, index) => item._id}
            data={data}
            renderItem={row => this.renderRow(row.item) }
          />
        </View>
      </View>
    );
  }

  onSelect(id) {
    this.props.onSelectReport(id);
  }

  onRemove(id) {
    this.props.onRemoveReport(id);
  }

  renderRow(item) {
    let msg = item.msg;
    const itemId = item._id;
    const mm = moment.unix(item.createdTime);
    const price = 'Rp. '+item.totalPrice;
    let mmStr = mm.format("D MMMM YYYY");
    let title = null;

    if( item.kind && item.kind == 'daily') {
      title = (
        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
          <View style={{flex:1}}><Text style={{fontWeight:'bold'}}>{mmStr} {price}</Text></View>
        </View>
      );
    } else {
      mmStr = mm.format("D MMMM YYYY, HH:mm");      
      title = <Text style={{fontWeight:'bold'}}>{mmStr}</Text>
    }

    return (
      <View         
        style={{
          borderBottomColor: '#bbb',
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingVertical:4*vw,
        }}>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal:2*vw,
          justifyContent:'space-between',
          alignItems:'center'
        }}>
          <View style={{flex:1,padding:vw}}>
            {title}              
            <Text>{msg}</Text>
          </View>
          <View style={{padding:vw}}>
            <ButtonIcon onPress={()=>this.onSelect(itemId)}>
              <Icon name="arrow-circle-o-right" size={30} />
            </ButtonIcon>
          </View>
        </View>
      </View>
    );
  }
}

/*
<View style={{padding:vw}}>
  <ButtonIcon onPress={()=>this.onRemove(itemId)}>
    <Icon name="trash" size={30} />
  </ButtonIcon>
</View>
*/