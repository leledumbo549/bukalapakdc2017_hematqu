import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={{flex:1,
        justifyContent: 'center',
        alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}

