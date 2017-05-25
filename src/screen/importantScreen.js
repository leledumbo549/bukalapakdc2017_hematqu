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
      
    return (
      <View style={{flex:1,paddingTop:54}}>
        <View style={{flex:1,padding:6*vw,justifyContent:'flex-end',alignItems:'center'}}>
          <Icon name='envelope-o' size={30}/>
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
    const name = item.name.toUpperCase();    
    const delta = ' '+Math.abs(item.delta);    
    let ico = 'arrow-up';
    let col = 'red';

    if( item.delta <= 0 ) {
      ico = 'arrow-down';
      col = 'green';
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
            <View>              
              <Icon name={ico} color={col}/>
            </View>
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
