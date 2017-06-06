import React, { Component } from 'react';
import EditScreen from '../screen/editScreen';
import platform from '../platform';
import bukalapakLib from '../bukalapakLib';
import feathersLib from '../feathersLib';
import _ from 'lodash';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:true,
      editedItem:null   
    }
  }

  componentDidMount() {
    const editedItem = this.props.stateItemEditor.editedItem;
    if( editedItem ) {
      this.setState({
        isBusy:false,
        editedItem
      }) 
    } else {
      this.setState({
        isBusy:false
      });
    }

    // mode add
    // mode edit
  }

  saveItem() {
    const connected = this.props.stateDevice.connectionStatus;

    if( !connected ) {
      return platform.alertOK('','Belum berhasil menyimpan catatan. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    }

    let itemId = null;
    if( this.state.editedItem && this.state.editedItem._id ) itemId = this.state.editedItem._id;

    const categoryId = 'all';

    this.setState({
      isBusy:true
    });

    const products = this.props.stateItemEditor.products.slice(0);
    products.sort((a,b)=>{
      const ap = a.price*a.num;
      const bp = b.price*b.num;
      return ap-bp;
    });
    
    const all = [];
    for(let i=0;i<products.length;i++) {
      all.push(products[i].id);
    }

    const cheapest = products[0];
    const cheapestPrice = cheapest.price*cheapest.num;
    const toSave = {
      searchTerm:this.state.lastSearchTerm,
      categoryId:categoryId,
      itemId:cheapest.id,
      name:cheapest.name,
      seller:cheapest.seller,
      price:cheapestPrice,
      prevPrice:cheapestPrice,
      img:cheapest.img,
      all:all,

      titleVal:this.props.stateItemEditor.title,
      products:products
    }

    const items = feathersLib.getApp().service('items');

    let thePromise = null;
    if( itemId ) {
      thePromise = items.patch(itemId,toSave);
    } else {
      thePromise = items.create(toSave);
    }

    thePromise.then(result=>{
      return this.props.actions.updateHomePage()    
    })
    .then(result=>{
      platform.historyPop();
    })
    .catch(err=>{
      this.setState({
        isBusy:false
      });

      platform.alertOK('','Daftar belum berhasil ditambahkan. Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    });    
  }

  removeItem() {    
    const connected = this.props.stateDevice.connectionStatus;

    if( !connected ) {
      return platform.alertOK('','Belum berhasil menghapus catatan. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    }

    this.setState({
      isBusy:true
    });

    let itemId = null;
    if( this.state.editedItem && this.state.editedItem._id ) itemId = this.state.editedItem._id;
    if( !itemId ) return;

    const items = feathersLib.getApp().service('items');
    
    items.remove(itemId)
    .then(result=>{      
      return this.props.actions.updateHomePage();
    })
    .then(result=>{
      platform.historyPop();
    })
    .catch(err=>{
      this.setState({
        isBusy:false
      });

      platform.alertOK('','Daftar belum berhasil dihapus. Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    });    
  }

  newProduct() {
    platform.historyPush('category');
  }

  setNumProduct(prodId,delta) {
    const products = this.props.stateItemEditor.products.slice(0);
    const index = _.findIndex(products, { id: prodId });
    products[index].num += delta;

    if( products[index].num <= 0 ) {
      products.splice(index, 1);
    }

    this.props.actions.setEditorData({
      products:products
    });

  }

  render() {
    const products = this.props.stateItemEditor.products.slice(0);
    // products.sort((a,b)=>{
    //   const ap = a.price*a.num;
    //   const bp = b.price*b.num;
    //   return ap-bp;
    // });

    let cheapestIndex = 0;
    let cheapestPrice = -1;
    for(let i=0;i<products.length;i++) {
      const item = products[i];
      const productPrice = item.price*item.num;
      products[i].cheapest = false;

      if( cheapestPrice == -1 ) {
        cheapestIndex = 0;
        cheapestPrice = productPrice;
      } else if( productPrice < cheapestPrice ) {
        cheapestIndex = i;
        cheapestPrice = productPrice;
      }
    }
    
    products[cheapestIndex].cheapest = true;

    return (
      <EditScreen  
        showDelete={(this.state.editedItem != null)}
        isBusy={this.state.isBusy}
        titleVal={this.props.stateItemEditor.title}
        onTitleChange={val=>
          this.props.actions.setEditorData({
            title:val
          })}
        products={products}
        onSaveItem={()=>this.saveItem()}
        onRemoveItem={()=>this.removeItem()}
        onNewProduct={()=>this.newProduct()} 

        onAddNum={(prodId,delta)=>this.setNumProduct(prodId,delta)}
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
    stateAppData: state.AppData,
    stateItemEditor: state.ItemEditor
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
)(Editor);