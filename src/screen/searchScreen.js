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

class SearchRow extends Component {
  constructor() {
    super();
    this.state = {
      status:false
    };
  }

  onToggle(val) {
    const item = this.props.item;
    this.props.onToggle(item.id,val);
    this.setState({status:val});
  }

  render() {
    const item = this.props.item;
    const name = item.name;
    const itemId = item.id;
    const price = 'Rp. '+item.price;
    const shop = 'Pelapak: '+item.seller;
    const imgUrl = item.img;

    const tagged = this.props.selected;
    const btn = (tagged ? 'OK' : 'TAG');

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
          <Image
            style={{width: 20*vw, height: 20*vw}}
            source={{uri: imgUrl}}
          />
          <View style={{flex:1,padding:vw,alignItems:'flex-start'}}>
            <Text style={{fontWeight:'bold'}}>{name.toUpperCase()}</Text>    
            <Text style={{fontSize:10}}>{shop.toUpperCase()}</Text>    
            <Text>{price}</Text>    
          </View>
          <Switch
            onValueChange={(value) => this.onToggle(value)}
            value={this.state.status} />
        </View>
      </View>
    );
  }

};

export default class SearchScreen extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm:'',
      tags:{},
      numTags:0
    }
  }

  submitSearchTerm() {
    const searchTerm = this.state.searchTerm;
    this.props.onSubmitSearchTerm(searchTerm);
  }

  saveResult() {
    const keyval = this.state.tags;
    const tagged = [];
    for (var key in keyval) {
      if (keyval.hasOwnProperty(key)) {
        const obj = keyval[key];
        tagged.push(obj);
      }
    }
    this.props.onSave(tagged);
  }

  onToggleIndex(index,status) {
    // console.warn(index+':'+status)
  }

  renderSearchList() {
    const btnCol = config.BTN_COLOR;
    const data = this.props.searchProducts.slice(0);
    
    return (
      <View style={{flex:1,paddingTop:54}}>
        <View style={{flexDirection:'row'}}>   
          <View style={{flex:1,padding:2*vw}}>       
            <TextInput
              placeholder='ENTER PRODUCT & TAP CARI'
              onChangeText={(text) => this.setState({searchTerm:text})}
              value={this.state.searchTerm}
            />
          </View>
          <View style={{padding:2*vw,alignItems:'center',justifyContent:'center'}}>       
            <Icon.Button name="search" onPress={()=>this.submitSearchTerm()} backgroundColor={btnCol}>
              CARI
            </Icon.Button>
          </View>
        </View>
        <View style={{flex:1,padding:2*vw}}>
          <FlatList
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            data={data}
            renderItem={row => <SearchRow 
              item={row.item} 
              onToggle={(id,status)=>{
                const tags = Object.assign({},this.state.tags);
                let numTags = this.state.numTags;

                if(status) {
                  numTags++;
                  tags[id] = Object.assign({},row.item);
                }
                else {
                  numTags--;
                  delete tags[id];
                }
                
                this.setState({
                  tags,
                  numTags
                });
              }}

              />}
          />
        </View>
        <View style={{padding:2*vw}}>          
          <View style={{padding:3*vw}}>
            <Text style={{textAlign:'center'}}>SWITCH ON PRODUK DAN PELAPAK YANG RELEVAN LALU TAP TAMBAHKAN</Text>
          </View>
          <Button
            onPress={()=>this.saveResult()}
            title="TAMBAHKAN"
            color={btnCol}
            disabled={(this.state.numTags == 0)}
          />
        </View>
      </View>
    );      
  }

  render() {
    const btnCol = config.BTN_COLOR;

    if( this.props.isBusy ) {
      return <BusyScreen />;
    }

    return this.renderSearchList();
  }
}