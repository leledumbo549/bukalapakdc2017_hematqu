import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  ActivityIndicator,
  View,
  Text
} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'crimson'
  }
});
