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
import platform from '../platform';
import feathersLib from '../feathersLib';
import ButtonIcon from 'react-native-button';

class NewNotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true
    }
  }

  cancelBusy() {
    this.setState({
      isBusy:false
    });
  }

  componentDidMount() {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) return this.cancelBusy();
    const detail = this.props.detail;
    if( detail.kind != 'daily' ) return this.cancelBusy();

    const userId = this.props.stateLogin.user._id;

    const query = {
      $sort: { createdTime: -1 },
      $limit: 101,
      kind:'daily',
      forUserId: userId
    };

    const reportService = feathersLib.getApp().service('notifications');
    reportService.find({query})
    .then(result=>{
      if( result.total <= 1 ) throw 'no advice';
      const curPrice = result.data[0].price;
      const numDays = result.total - 1;
      let totalPrice = 0;
      let arrGraph = [];
      for(let i=0;i<result.data.length;i++) {
        totalPrice += result.data[i].price;
        arrGraph.unshift(result.data[i].price);
      }
      let avgPrice = Math.floor(totalPrice / result.data.length);
      let advice = false;
      
      if( curPrice > avgPrice ) {
        this.setState({
          isBusy:false,
          advice:'JANGAN BERBELANJA SEKARANG. KARENA LEBIH MAHAL DARI RATA-RATA '+numDays+' HARI KEBELAKANG SEBESAR RP. '+avgPrice,
          adviceType:'bad',
          arrGraph
        });
      } else if( curPrice < avgPrice ) {
        this.setState({
          isBusy:false,
          advice:'BELANJA SEKARANG! KARENA LEBIH MURAH DARI RATA-RATA '+numDays+' HARI KEBELAKANG SEBESAR RP. '+avgPrice,
          adviceType:'good',
          arrGraph
        });
      } else {
        this.setState({
          isBusy:false,
          advice:'TUNGGULAH BEBERAPA HARI LAGI, SEBELUM MENDAPAT REKOMENDASI',
          adviceType:'neutral',
          arrGraph
        });              
      }

    })
    .catch(err=>{
      this.setState({
        isBusy:false,
        advice:'TUNGGULAH BEBERAPA HARI LAGI, SEBELUM MENDAPAT REKOMENDASI',
        adviceType:'neutral'
      });      
    });    
  }

  next() {
    // platform.historyReplace('launch');
    platform.historyReplace('drawer');
  }

  renderAdviceRow() {
    if(this.state.isBusy) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    if( !this.state.advice ) return null;

    let col = 'gray';
    if( this.state.adviceType == 'good' ) col = 'green';
    else if( this.state.adviceType == 'bad' ) col = 'red';

    return (
      <View>
        <Text style={{textAlign:'center',color:col}}>{this.state.advice}</Text>
      </View>
    );
  }

  renderChart() {
  }

  render() {

    // return <DemoGraph arr={this.state.arrGraph}/>;

    const detail = this.props.detail;
    const msg = detail.msg.toUpperCase();

    let logo = (
      <View style={{alignItems:'center'}}>
        <Image
          source={require('../logo.png')}
        />
        <Text style={{textAlign:'center',padding:5*vw}}>
          APLIKASI PENGHEMAT BELANJA BULANAN
        </Text>        
      </View>
    );
      
    return (
      <View style={{flex:1,paddingTop:0}}>
        <View style={{flex:1,padding:15*vw,justifyContent:'center',alignItems:'center'}}>
          {logo}
          <Text />
          <Text style={{textAlign:'center',fontWeight:'bold'}}>
            {msg}
          </Text>
          <Text />
          {this.renderAdviceRow()}
        </View>
        <View style={{padding:1*vw}}>        
          <ButtonIcon onPress={()=>this.next()}>
            <View style={{alignItems:'center',backgroundColor:'crimson',padding:1*vw}}>
              <Icon name="sign-in" size={30} color='white'/>
              <Text style={{color:'white'}}>KEMBALI KE APLIKASI</Text>
            </View>
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
    alignItems: 'center'
  }
});

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login,
    stateDevice: state.Device,
    stateAppData: state.AppData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNotificationScreen);