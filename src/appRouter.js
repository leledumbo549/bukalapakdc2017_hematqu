import React, { Component } from 'react';

// ** router wrapper go here **

import { 
  Router, 
  Scene, 
  ActionConst,
  Modal
} from 'react-native-router-flux';
import Main from './containers/main';
import Launch from './containers/launch';
import Home from './containers/home';
import Login from './containers/login';
import Category from './containers/category';
import Editor from './containers/editor';
import Search from './containers/search';
import Notification from './containers/notification';
import Shop from './containers/shop';
import Report from './containers/report';
import Important from './containers/important';
import NewNotification from './screen/newNotificationScreen';

// ** drawer & header **
import AboutUs from './screen/aboutUsScreen';
import LogOut from './screen/logoutScreen';
import NavigationDrawer from './NavigationDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text
} from 'react-native';
import Button from 'react-native-button';
import platform from './platform';
import ConnIndicator from './screen/connIndicator';
import {vw} from './platform';

class AppRouter extends Component { 
  constructor() {
    super();
  }

  renderBack() {
    return <View style={{width:54,height:54,position:"absolute",top:-10,left:0}}>
      <View style={{flex:1,justifyContent:'center',padding:5}}>
        <Button onPress={() => platform.historyPop()}>
          <Icon name="arrow-left" size={20} color='white'/>
        </Button>
      </View>
    </View>
  }

  renderBlank() {
    return <View />;
  }

  renderTitle(back) {
    let left = null;
    if( back ) {
      left = (
        <Button onPress={() => platform.historyPop()}>
          <Icon name="arrow-left" size={30} color='white'/>
        </Button>
      );
    } else {
      left = (
        <Button onPress={() => {
          this.props.actions.setDrawerOpen(true);
        }}>
          <Icon name="navicon" size={30} color='white'/>
        </Button>
      );
    }
    return <View style={{height:54,flexDirection:'row'}}>
      <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',padding:vw*3}}>
        {left}
      </View>
      <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>HematQu</Text>
      </View>
      <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',padding:vw*3}}>        
        <ConnIndicator />
      </View>
    </View>    
  }

  render() {
    return (
      <Main>
        <Router>
          <Scene key="root">
            <Scene initial={true} key="launch" hideNavBar={true} component={Launch}/>
            <Scene key="login" hideNavBar={true} component={Login} />
            <Scene key="newNotification" hideNavBar={true} component={NewNotification} type={ActionConst.RESET} />
            <Scene key="drawer" component={NavigationDrawer}>
              <Scene key="main" tabs>
                <Scene key="tab1"                                       
                  navigationBarStyle={{backgroundColor:'crimson'}} >
                  <Scene key="home" initial={true} component={Home} type={ActionConst.RESET} 
                    renderTitle={()=>this.renderTitle(false)} 
                    renderLeftButton={this.renderBlank} />
                  <Scene key="editor" component={Editor}
                    renderTitle={()=>this.renderTitle(true)}  
                    renderBackButton={this.renderBlank} />
                  <Scene key="category" component={Category}
                    renderTitle={()=>this.renderTitle(true)}  
                    renderBackButton={this.renderBlank} />
                  <Scene key="search" component={Search}
                    renderTitle={()=>this.renderTitle(true)}  
                    renderBackButton={this.renderBlank} />
                  <Scene key="notification" component={Notification}
                    renderTitle={()=>this.renderTitle(true)}  
                    renderBackButton={this.renderBlank} />
                  <Scene key="shop" component={Shop}
                    renderTitle={()=>this.renderTitle(true)}  
                    renderBackButton={this.renderBlank} />
                </Scene>
                <Scene key="tab2"
                  navigationBarStyle={{backgroundColor:'crimson'}} >
                  <Scene key="report" initial={true} component={Report} type={ActionConst.RESET} 
                    renderTitle={()=>this.renderTitle(false)} 
                    renderLeftButton={this.renderBlank} />
                  <Scene key="important" component={Important}
                    renderTitle={()=>this.renderTitle(true)}  
                    renderBackButton={this.renderBlank} />
                </Scene>
                <Scene key="tab3" component={AboutUs} 
                  renderTitle={()=>this.renderTitle(false)} 
                  renderLeftButton={this.renderBlank}
                  navigationBarStyle={{backgroundColor:'crimson'}} />
                <Scene key="tab4" component={LogOut} 
                  renderTitle={()=>this.renderTitle(false)} 
                  renderLeftButton={this.renderBlank}
                  navigationBarStyle={{backgroundColor:'crimson'}} />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Main>
    );
  }
}

/*

*/
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/AppActions';

function mapStateToProps(state) {
  return {
    stateDevice:state.Device
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
)(AppRouter);