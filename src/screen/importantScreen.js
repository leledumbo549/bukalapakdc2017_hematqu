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

export default class ImportantScreen extends Component {
  render() {
    const detail = this.props.detail;
    const msg = detail.msg;
    const mm = moment.unix(detail.createdTime);
    const mmStr = mm.format("dddd, D MMMM YYYY, HH:mm");
    const data = detail.report;
    let title = 'LAPORAN HARIAN';
    if( detail.kind != 'daily' ) title = 'PERUBAHAN HARGA';
      
    return (
      <View style={{flex:1,paddingTop:54}}>
        <View style={{flex:1,padding:6*vw,justifyContent:'flex-end',alignItems:'center'}}>
          <Icon name='envelope-o' size={30}/>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>
            {title}
          </Text>  
          <Text />
          <Text style={{textAlign:'center'}}>
            {mmStr}
          </Text>  
          <Text />        
          <Text style={{textAlign:'center'}}>
            {msg}
          </Text>          
        </View>
        <View style={{flex:1}}>
          <FlatList
            keyExtractor={(item, index) => index}
            data={data}
            renderItem={row => this.renderRow(row.item) }
          />
        </View>
      </View>
    );
  }


  renderRow(item) {
    const detail = this.props.detail;
        
    const name = item.name.toUpperCase();    
    let delta = ' '+Math.abs(item.delta);    
    let ico = 'arrow-up';
    let col = 'red';

    if( item.delta <= 0 ) {
      ico = 'arrow-down';
      col = 'green';
    }

    let sign = <View><Icon name={ico} color={col}/></View>;

    if( detail.kind == 'daily' ) {
      sign = null;
      col = 'black';
      if( item.price )
        delta = 'Rp. '+item.price;
      else
        return <View />;
    }

    return (
      <View         
        style={{
          borderBottomColor: '#bbb',
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingVertical:2*vw,
        }}>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal:2*vw,
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <View style={{flex:1,padding:vw}}>
              <Text>{name}</Text>
            </View>
            {sign}
            <View>              
              <Text style={{color:col}}>{delta}</Text>
            </View>
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
