import React, { Component } from 'react';
import ShopScreen from '../screen/shopScreen';
import platform from '../platform';
import feathersLib from '../feathersLib';
import bukalapakLib from '../bukalapakLib';

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false,
      items:[],
      itemIds:[]
    }
  }

  componentDidMount() {
    const items = this.props.stateAppData.items.slice(0);
    this.setState({
      items
    });
  }

  submitDecision() {
    console.warn(JSON.stringify(this.state.itemIds));
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) {
      return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    }

    this.setState({
      isBusy:true
    });

    const ids = this.state.itemIds.slice(0);
    console.warn(ids);

    this.addItems(ids)
    .then(()=>{
      this.setState({
        isBusy:false
      });
      platform.openURL('https://www.bukalapak.com');
    })
    .catch(err=>{
      this.setState({
        isBusy:false
      });

      platform.alertOK('','Belum berhasil menambahkan barang ke keranjang belanja. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    });
  }

  addItems(ids) {
    const token = this.props.stateLogin.user.BLToken;
    let sequence = Promise.resolve();
 
    for (let i=0;i<ids.length;i++){
      (function(){ // define closure to capture i at each step of loop
          
        const index = i;
        
        sequence = sequence.then(()=>{
          const itemId = ids[index];
          return bukalapakLib.addCart(token,itemId);
        });
        // .then(cartId=>console.warn(cartId+' added!'));

      }()) // invoke closure function immediately
    }

    return sequence;

  }

  addAll() {
    const itemIds = [];
    const items = this.state.items.slice(0);

    for(let i=0;i<items.length;i++) {
      items[i].inCart = true;  
      itemIds.push(items[i].itemId);
    }    
    this.setState({
      items,
      itemIds
    });
  }

  toggleItem(index) {
    const inCart = this.state.items[index].inCart;

    if( inCart ) 
      this.removeItemFromCart(index);
    else 
      this.addItemToCart(index);
  }

  addItemToCart(index) {
    const items = this.state.items.slice(0);
    items[index].inCart = true;
    const itemIds = this.state.itemIds;
    itemIds.push(items[index].itemId);
    this.setState({
      items,
      itemIds
    });
  }

  removeItemFromCart(index) {
    const items = this.state.items.slice(0);
    items[index].inCart = false;    
    const itemIds = this.state.itemIds;
    const pos = itemIds.indexOf(items[index].itemId);
    if(pos > -1) {
      itemIds.splice(pos, 1);
    }
    
    this.setState({
      items,
      itemIds
    });
  }

  render() {
    

    return (
      <ShopScreen 
        numInCart={this.state.itemIds.length}
        onAddAll={()=>this.addAll()}
        onToggle={index=>this.toggleItem(index)}
        items={this.state.items} isBusy={this.state.isBusy} onSubmitDecision={()=>this.submitDecision()}/>
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/AppActions';

function mapStateToProps(state) {
  return {
    stateLogin: state.Login,
    stateAppData: state.AppData,
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
)(Shop);