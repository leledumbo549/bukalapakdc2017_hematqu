import React, { Component } from 'react';
import BusyScreen from '../screen/busyScreen';
import HomeScreen from '../screen/homeScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';
import _ from 'lodash';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

  componentDidMount() {
    const connected = this.props.stateDevice.connectionStatus;

    if( connected ) {
      this.props.actions.updateHomePage()
      .then(()=>{

      })
      .catch(err=>{
      });      
    }

    const itemService = feathersLib.getApp().service('items');
    itemService.on('patched', item => {
      this.refresh();
    });
  }

  refresh() {
    this.props.actions.updateHomePage();
  }

  componentWillUnmount() {
    const itemService = feathersLib.getApp().service('items');

    itemService.on('patched', item => {      
    });    
  }

  removeItem(itemId) {
    const connected = this.props.stateDevice.connectionStatus;

    if( !connected ) {
      return platform.alertOK('','Belum berhasil menghapus produk. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    }

    const itemService = feathersLib.getApp().service('items');
    itemService.remove(itemId)
    .then(()=>{
      return this.props.actions.updateHomePage();
    })
    .catch(err=>{
      // console.warn('removeItemErr: ',err);
      platform.alertOK('','Belum berhasil menghapus produk. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    });

  }

  enterCategory() {
    platform.historyPush('category'); 
  }

  enterEditor() {
    this.props.actions.setEditorData({
      title:'',
      products:[],
      editedItem:null
    });
    platform.historyPush('editor'); 
  }

  editItem(itemId) {
    const items = this.props.stateAppData.items;
    const index = _.findIndex(items, { _id: itemId });
    
    if( index < 0 || index >= items.length ) return;

    const item = items[index];

    this.props.actions.setEditorData({
      title:item.titleVal,
      products:item.products,
      editedItem:item
    });

    platform.historyPush('editor'); 
  }

  enterNotification() {
    const items = this.props.stateAppData.items;
    if(!items || items.length == 0 ) return platform.alertOK('','Daftar belanjamu masih kosong. Tambah catatan terlebih dahulu.');

    platform.historyPush('notification'); 
  }

  enterShopping() {
    const items = this.props.stateAppData.items;
    if(!items || items.length == 0 ) return platform.alertOK('','Daftar belanjamu masih kosong. Tambah catatan terlebih dahulu.');

    platform.historyPush('shop'); 
  }

  enterLogout() {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) {
      return platform.alertOK('','Tidak berhasil log out. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    }

    this.setState({
      isBusy:true
    });

    feathersLib.getApp().logout();
    this.props.actions.logoutUser();
    platform.historyReplace('launch');
  }

  render() {    
    const user = this.props.stateLogin.user;
    const items = this.props.stateAppData.items;

    let notificationStatus = false;

    let curPrice = 0;
    let prevPrice = 0;

    if( user ) {
      // curPrice = user.totalPrice;
      
      for(let i=0;i<items.length;i++) {
        curPrice += items[i].price;
      }

      prevPrice = user.prevPrice;
      if( !prevPrice ) prevPrice = 0;
    }

    if( user && user.onesignalId && user.onesignalId != '' ) {
      notificationStatus = true;
    }

    return (
      <HomeScreen
        curPrice={curPrice}
        prevPrice={prevPrice}
        notificationStatus={notificationStatus}
        isBusy={this.state.isBusy}
        onClick1={()=>this.enterEditor()} 
        onClick2={()=>this.enterNotification()} 
        onClick3={()=>this.enterShopping()}
        onClick4={()=>this.enterLogout()}
        items={items}
        onRemoveItem={(itemId)=>this.removeItem(itemId)}
        onEditItem={(itemId)=>this.editItem(itemId)}
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
)(Home);