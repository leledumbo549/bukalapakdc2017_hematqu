import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import CategoryScreen from '../screen/categoryScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

  componentDidMount() {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) return;

    const token = this.props.stateLogin.user.BLToken;
    bukalapakLib.getCategories(token)
    .then(cats=>{
      this.props.actions.setCategories(cats);
    })
    .catch(err=>{
    });
  }

  selectCategory(index) {
    this.props.actions.setSearchProducts([]);
    platform.historyPushByParam('search',{categoryId:index});
  }

  render() {
    const cats = this.props.stateAppData.categories.slice();

    if( cats.length > 0 )
      cats.unshift({id:'all',name:'SEMUA KATEGORI'});
    else
      return <BusyScreen />;

    return (
      <CategoryScreen 
        isBusy={this.state.isBusy}
        onSelectCategory={(index)=>this.selectCategory(index)} 
        cats={cats}
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
)(Category);