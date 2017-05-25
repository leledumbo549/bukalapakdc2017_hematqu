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

class ProductRow extends Component {
  constructor() {
    super();
    this.state = {
      status:false
    };
  }

  addNum(delta) {
    const item = this.props.item;
    const itemId = item.id;
    this.props.onAddNum(itemId,delta);
  }

  render() {
    const item = this.props.item;
    const name = item.name;
    const itemId = item.id;
    const price = 'Rp. '+(item.price*item.num);
    const shop = 'Pelapak: '+item.seller;
    const imgUrl = item.img;

    let cheapestStr = null;
    if( this.props.rowIndex == 0 ) cheapestStr = <Text style={{fontSize:10,color:'green'}}>TERMURAH</Text>;

    const tagged = this.props.selected;
    const btn = (tagged ? 'OK' : 'TAG');
    const numVal = ' ' + item.num + ' ';

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
            <Text style={{fontWeight:'bold'}}>{name.toUpperCase()} {cheapestStr}</Text>    
            <Text style={{fontSize:10}}>{shop.toUpperCase()}</Text>    
            <Text>{price}</Text>    
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <ButtonIcon onPress={()=>this.addNum(-1)}><Icon name="minus-square" size={30} /></ButtonIcon>
            <Text style={{fontSize:24}}>{numVal}</Text>
            <ButtonIcon onPress={()=>this.addNum(1)}><Icon name="plus-square" size={30} /></ButtonIcon>
          </View>
        </View>
      </View>
    );
  }

};

export default class EditScreen extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    if( this.props.isBusy ) return <BusyScreen />;
    
    const btnCol = config.BTN_COLOR;
    const data = this.props.products;

    let content = <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{textAlign:'center'}}>DAFTAR KOSONG</Text>
    </View>
    ;

    if( data.length > 0 ) {
      content = (

        <FlatList
          extraData={this.state}
          keyExtractor={(item, index) => item.id}
          data={data}
          renderItem={row => <ProductRow 
            item={row.item} 
            rowIndex={row.index}
            onAddNum={(itemId,delta)=>this.props.onAddNum(itemId,delta)}
            />}
        />
      );

    }

    let btnDelete = null;
    if( this.props.showDelete ) {
      btnDelete = (
        <View style={{flex:1,padding:vw}}>
          <Button
            onPress={()=>this.props.onRemoveItem()}
            title="HAPUS"
            color={btnCol}
          />
        </View>
      );

    }
    
    return (
      <View style={{flex:1,paddingTop:54}}>

        <View style={{padding:2*vw}}>    
          <View style={{padding:3*vw}}>
            <Text style={{fontSize:10,textAlign:'center'}}>MASUKAN KEBUTUHAN BULANANMU SEBAGAI JUDUL CATATAN. MISAL: MINYAK GORENG</Text>   
          </View>
          <TextInput
            placeholder='MASUKAN JUDUL CATATAN'
            onChangeText={(text) => this.props.onTitleChange(text)}
            value={this.props.titleVal}
          />
        </View>

        <View style={{flexDirection:'row',padding:2*vw,alignItems:'center'}}>    
          <View style={{flex:1,padding:vw}}>
            <Text style={{fontSize:10,textAlign:'left'}}>TAMBAHKAN PRODUK/LAPAK YANG RELEVAN DENGAN MENTAP TOMBOL TAMBAH</Text>   
          </View>
          <View style={{padding:vw}}>
            <Button
              onPress={()=>this.props.onNewProduct()}
              title="TAMBAH"
              color={btnCol}
              disabled={(this.props.titleVal.length == 0)}
            />
          </View>
        </View>

        <View style={{flex:1,padding:2*vw}}>
          {content}
        </View>

        <View style={{padding:2*vw}}>          
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1,padding:vw}}>
              <Button
                onPress={()=>this.props.onSaveItem()}
                title="SIMPAN"
                color={btnCol}
                disabled={(data.length == 0)}
              />
            </View>
            {btnDelete}
          </View>
        </View>
      </View>
    );      
  }

}