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

export default class CategoryScreen extends Component {
  render() {
    
    if(this.props.isBusy) {
      return <BusyScreen />;
    }

    let data = this.props.cats;
    return (
      <View style={{flex:1,paddingTop:54}}>
        <View>
          <Text style={{textAlign:'center',padding:6*vw}}>
            PILIHLAH SALAH SATU KATEGORI DIBAWAH
          </Text>          
        </View>
        <View style={{flex:1}}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={data}
            renderItem={row => this.renderRow(row.item) }
          />
        </View>
      </View>
    );
  }

  onSelect(itemId) {
    this.props.onSelectCategory(itemId);
  }

  renderRow(item) {
    const name = item.name.toUpperCase();
    const itemId = item.id;

    return (
      <View         
        style={{
          borderBottomColor: '#bbb',
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingVertical:4*vw,
        }}>
        <TouchableHighlight onPress={()=>this.onSelect(itemId)}>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal:2*vw,
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <Text>{name}</Text>    
            <Icon name="arrow-circle-o-right" size={30} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
