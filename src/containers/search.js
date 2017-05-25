import React, { Component } from 'react';
import SearchScreen from '../screen/searchScreen';
import platform from '../platform';
import bukalapakLib from '../bukalapakLib';
import feathersLib from '../feathersLib';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isBusy:false
    }
  }

  componentDidMount() {
    
  }

  backHome() {
    platform.historyPush('home');
  }

  searchTerm(term) {
    this.setState({
      isBusy:true,
      lastSearchTerm:term
    });

    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) {
      this.props.actions.setSearchProducts([]);
      this.setState({
        isBusy:false
      });

      return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    }

    
    const token = this.props.stateLogin.user.BLToken;
    const categoryId = this.props.categoryId;

    bukalapakLib.getProductList(token,categoryId,term)
    .then(products=>{
      this.props.actions.setSearchProducts(products);
      this.setState({
        isBusy:false
      });
    })
    .catch(err=>{
      this.props.actions.setSearchProducts([]);
      this.setState({
        isBusy:false
      });

      platform.alertOK('','Produk tidak ditemukan. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
    });

  }

  // saveTags(tags) {
  //   const connected = this.props.stateDevice.connectionStatus;
  //   if( !connected ) {
  //     return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
  //   }

  //   const categoryId = this.props.categoryId;

  //   this.setState({
  //     isBusy:true
  //   });
    
  //   tags.sort((a,b)=>{
  //     return a.price-b.price;
  //   });

  //   const all = [];
  //   for(let i=0;i<tags.length;i++) {
  //     all.push(tags[i].id);
  //   }

  //   const cheapest = tags[0];
  //   const toSave = {
  //     searchTerm:this.state.lastSearchTerm,
  //     categoryId:categoryId,
  //     itemId:cheapest.id,
  //     name:cheapest.name,
  //     seller:cheapest.seller,
  //     price:cheapest.price,
  //     prevPrice:cheapest.price,
  //     img:cheapest.img,
  //     all:all
  //   }

  //   const items = feathersLib.getApp().service('items');

  //   items.create(toSave)
  //   .then(result=>{
  //     const query = {
  //       $sort: { createdAt: -1 },
  //       $limit: 100
  //     };

  //     return items.find({query});
  //   })
  //   .then(result=>{
  //     this.props.actions.setItems(result.data);
  //     return this.props.actions.updateHomePage()    
  //   })
  //   .then(result=>{
  //     this.backHome();
  //   })
  //   .catch(err=>{
  //     this.setState({
  //       isBusy:false
  //     });

  //     platform.alertOK('','Produk belum berhasil ditambahkan. Pastikan jaringan internet tersedia dan cobalah beberapa saat lagi.');
  //   });

    
  // }

  saveTags(tags) {
    const connected = this.props.stateDevice.connectionStatus;
    if( !connected ) {
      return platform.alertOK('','Pastikan jaringan internet tersedia kemudian cobalah beberapa saat lagi.');
    }

    const categoryId = this.props.categoryId;

    this.setState({
      isBusy:true
    });
    
    // tags.sort((a,b)=>{
    //   return a.price-b.price;
    // });

    this.props.actions.addEditorProducts(tags);
    platform.historyPopTwice();
  }

  render() {
    const products = this.props.stateAppData.searchProducts.slice(0);
    // products.sort((a,b)=>{
    //   return a.price-b.price;
    // });
    
    return (
      <SearchScreen  
        isBusy={this.state.isBusy}               
        searchProducts={products}
        onSave={tags=>this.saveTags(tags)}
        onSubmitSearchTerm={(term)=>this.searchTerm(term)} />
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
)(Search);