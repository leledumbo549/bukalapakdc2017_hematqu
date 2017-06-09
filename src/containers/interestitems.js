import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import InterestItemsScreen from '../screen/interestItemsScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';
import _ from 'lodash';

class InterestItems extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true,
      data:[]
    }
  }

  componentDidMount() {
    const connected = this.props.stateDevice.connectionStatus;

    if( connected ) {
      this.updateList();
    }
  }

  updateList() {
    const uid = this.props.uid;
    const interestId = this.props.interestId;
    //console.warn(uid);
    bukalapakLib.getInterestItems(uid,interestId)
      .then(arr=>{
        // console.warn(arr);
        if( arr ) {
          this.setState({
            isBusy:false,
            data:arr
          });
        }
      })
      .catch(err=>console.warn(err));    
  }

  componentWillUnmount() {
  }

  render() {    
    return (
      <InterestItemsScreen
        data={this.state.data}
        isBusy={this.state.isBusy}
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
)(InterestItems);