import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text
} from 'react-native';

export default class BusyScreen extends Component {
  render() {
    let msg = "";
    if(this.props.msg) msg = this.props.msg;
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
        <Text>{msg}</Text>
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
