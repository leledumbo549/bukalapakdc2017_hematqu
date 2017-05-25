import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class Dummy extends Component {
  render() {
    let btn1 = null;
    let btn2 = null;
    let btn3 = null;
    
    if(this.props.btn1) {
      btn1 = <View style={{alignSelf: 'stretch',padding:5}}>
        <Button
          onPress={()=>this.props.onClick1()}
          title={this.props.btn1}
          color="#841584"
        />
      </View>;
    }

    if(this.props.btn2) {
      btn2 = <View style={{alignSelf: 'stretch',padding:5}}>
        <Button
          onPress={()=>this.props.onClick2()}
          title={this.props.btn2}
          color="#841584"
        />
      </View>;
    }

    if(this.props.btn3) {
      btn3 = <View style={{alignSelf: 'stretch',padding:5}}>
        <Button
          onPress={()=>this.props.onClick3()}
          title={this.props.btn3}
          color="#841584"
        />
      </View>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.msg}
        </Text>
        
        {btn1}
        {btn2}
        {btn3}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
