import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import platform from '../platform';
import bukalapakLib from '../bukalapakLib';
import feathersLib from '../feathersLib';
import { GiftedChat } from 'react-native-gifted-chat';

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

import {vw} from '../platform';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true,
      messages: [
      ]
    }
  }

  componentDidMount() {
    const userIdToListen = this.props.userIdToListen;
    const senderId = this.props.senderId;
    const senderName  = this.props.senderName;
    const senderAvatar = this.props.senderAvatar;

    const users = feathersLib.getApp().service('users');
    const chats = feathersLib.getApp().service('chats');
    users.patch(senderId,{inRoom:userIdToListen})
    .then(result=>{
      this.loadMessages();      

    })
    .catch(err=>{
      console.warn(err);
      console.warn('user set inRoom fail!');
    });

    chats.on('created', createdMessage => {
      const newMessages = this.state.messages.slice(0);
      newMessages.unshift(this.formatMessage(createdMessage));
      this.setState({messages:newMessages});
    });
    
    // call api add user listener
    // const chats = feathersLib.getApp().service('chats');
    // chats.on('created', createdMessage => {

    //   console.warn(JSON.stringify(createdMessage));

    //   // const newMessages = this.state.messages.slice(0);
    //   // newMessages.unshift(this.formatMessage(createdMessage));
    // });
  }

  componentWillUnmount() {
    const chats = feathersLib.getApp().service('chats');
    chats.on('created', createdMessage => {
      
    });
  }

  loadMessages() {
    const userIdToListen = this.props.userIdToListen;
    const chats = feathersLib.getApp().service('chats');

    const query = {query: {
      room: userIdToListen,
      $sort: {createdAt: -1}
    }};

    console.warn(JSON.stringify(query));
    
    return chats.find(query).then(response => {
      const messages = [];
      
      for (let message of response.data) {
        // console.warn(JSON.stringify(message));
        messages.push(this.formatMessage(message));
      }

      this.setState({
        isBusy:false,
        messages
      });

    }).catch(error => {
      console.warn(error);
      console.warn('load messages fail!');
    });
  }

  formatMessage(message) {
    return {
      _id: message._id,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.sentBy._id,
        name: message.sentBy.name,
        avatar: message.sentBy.avatar
      }
    };
  }

  sendMsg(msg) {
    // const connected = this.props.stateDevice.connectionStatus;
    // if( !connected ) {
    //   return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    // }
    console.warn(JSON.stringify(msg));
    const text = msg[0].text;
    const userIdToListen = this.props.userIdToListen;

    const service = feathersLib.getApp().service('chats');
    service.create({
      room:userIdToListen,
      text:text
    });

    // const newMessages = GiftedChat.append(this.state.messages, msg);
    // console.warn(JSON.stringify(newMessages));
    // this.setState({messages:newMessages});
  }

  render() {
    if( this.state.isBusy ) return <BusyScreen />;

    const senderName  = this.props.senderName;
    const senderAvatar = this.props.senderAvatar;
    const senderId = this.props.senderId;

    let myChat = false;
    if( this.props.userIdToListen == senderId ) {
      return (
        <View style={{flex:1,paddingTop:54}}>
          <View style={{padding:5*vw}}>
            <Text style={{textAlign:'center',fontWeight:'bold'}}>
              TUNGGU TAWARAN TERBAIK DARI PELAPAK PILIHANMU DI CHAT ROOM INI
            </Text>
          </View>
          <View style={{flex:1}}>
            <GiftedChat
              messages={this.state.messages}
              onSend={msg=>this.sendMsg(msg)}
              user={{
                _id: senderId,
                name: senderName,
                avatar: senderAvatar
              }} />      
          </View>            
        </View>
      );
    } 

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={msg=>this.sendMsg(msg)}
        user={{
          _id: senderId,
          name: senderName,
          avatar: senderAvatar
        }} />
    );
  }
}

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
)(Chat);