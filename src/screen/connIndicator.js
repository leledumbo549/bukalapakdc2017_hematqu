import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class ConnIndicator extends Component {
  render() {
    if(this.props.stateDevice.connectionStatus) return <Icon name="check-circle-o" size={30} color='white'/>;
    return <Icon name="ban" size={30} color='white'/>;
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateDevice: state.Device
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
)(ConnIndicator);