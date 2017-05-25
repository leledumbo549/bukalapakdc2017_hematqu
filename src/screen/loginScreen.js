import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import config from '../config';
import {vw} from '../platform';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:''
    }
  }

  submitUserPass() {
    const user = this.state.username;
    const pass = this.state.password;
    this.props.onSubmitUserPass(user,pass);
  }

  render() {
    const btnCol = config.BTN_COLOR;
    let content = null;

    if( this.props.isBusy ) {
      content = <ActivityIndicator size="large"/>;
    } else {
      content = (<View>
        <TextInput
          placeholder='ENTER USERNAME'
          onChangeText={(text) => this.setState({username:text})}
          value={this.state.username}
        />
        <TextInput
          placeholder='ENTER PASSWORD'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password:text})}
          value={this.state.password}
        />
        <Button
          onPress={()=>this.submitUserPass()}
          title="LOGIN BUKALAPAK"
          color={btnCol}
        />
      </View>);
    }

    return (
      <View style={{flex:1,padding:5*vw,justifyContent:'center'}}>
        <View style={{alignItems:'center'}}>
          <Image
            source={require('../logo.png')}
          />
          <Text style={{textAlign:'center',padding:5*vw}}>
            APLIKASI PENGHEMAT BELANJA BULANAN
          </Text>        
        </View>
        <Text style={{textAlign:'center',padding:2*vw,fontSize:10}}>
          MASUKLAH DENGAN AKUN BUKALAPAK
        </Text>        
        {content}
        <Text style={{textAlign:'center',paddingTop:10*vw,fontSize:10}}>
          BELUM TERDAFTAR? DAFTAR TERLEBIH DAHULU DI
        </Text>
        <TouchableOpacity
          onPress={()=>this.props.onRegister()}>        
          <Text style={{textAlign:'center',color:btnCol}}>
            BUKALAPAK.COM
          </Text>        
        </TouchableOpacity>
      </View>
    );
  }
}