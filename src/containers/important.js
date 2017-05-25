import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import ImportantScreen from '../screen/importantScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';

class Report extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

  componentDidMount() {
    // this.props.detail;
  }

  render() {
    return (
      <ImportantScreen 
        detail={this.props.detail}
        showOK={false}
        />
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
)(Report);