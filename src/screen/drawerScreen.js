import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Image
} from 'react-native';

import Button from 'react-native-button';
import {vw} from '../platform';
import Icon from 'react-native-vector-icons/FontAwesome';

class DrawerScreen extends Component {
  constructor(props,context) {
    super();
  }

  openTab(index) {
    this.props.onClose(index);
  }

  render() {
    const msg = this.props.msg;
    return (
      <View style={styles.container}>
        <View style={{flex:1,backgroundColor:'crimson',alignItems:'center',justifyContent:'center'}}>
          <Image
            source={require('../logo.png')}
          />
          <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>HematQu</Text>
        </View>
        <View style={{flex:3,backgroundColor:'white'}}>
          <Button onPress={()=>this.openTab(1)}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5*vw,alignItems:'center',
              borderBottomColor: 'gainsboro',
              borderBottomWidth: StyleSheet.hairlineWidth}}>
              <Icon name="pencil-square-o" size={30} />
              <Text>DAFTAR BELANJA</Text>
            </View>
          </Button>
          <Button onPress={()=>this.openTab(2)}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5*vw,alignItems:'center',
              borderBottomColor: 'gainsboro',
              borderBottomWidth: StyleSheet.hairlineWidth}}>
              <Icon name="envelope-o" size={30} />
              <Text>NOTIFIKASI MASUK</Text>
            </View>
          </Button>
          <Button onPress={()=>this.openTab(3)}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5*vw,alignItems:'center',
              borderBottomColor: 'gainsboro',
              borderBottomWidth: StyleSheet.hairlineWidth}}>
              <Icon name="hand-peace-o" size={30} />
              <Text>TENTANG KAMI</Text>
            </View>
          </Button>
          <Button onPress={()=>this.openTab(4)}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5*vw,alignItems:'center',
              borderBottomColor: 'gainsboro',
              borderBottomWidth: StyleSheet.hairlineWidth}}>
              <Icon name="sign-out" size={30} />
              <Text>LOG OUT</Text>
            </View>
          </Button>
          </View>
      </View>
    );
  }
}

// DrawerScreen.contextTypes = {
//   drawer: React.PropTypes.object,
// };

export default DrawerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
