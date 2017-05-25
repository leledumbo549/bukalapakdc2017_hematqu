import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

import DrawerScreen from './screen/drawerScreen';
import platform from './platform';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {
  constructor() {
    super();
  }

  closeDrawer(index) {
    this._drawer.close();
    if(index == 1) platform.historyPush('tab1');
    else if(index == 2) platform.historyPush('tab2');
    else if(index == 3) platform.historyPush('tab3');
    else if(index == 4) platform.historyPush('tab4');
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;    
    const drawerOpen = this.props.stateDevice.drawerOpen;

    return (
      <Drawer
        ref={ref=>{
          this._drawer = ref;
        }}
        open={drawerOpen}
        type="displace"
        onClose={()=>{
          this.props.actions.setDrawerOpen(false);
        }}
        content={<DrawerScreen onClose={index=>this.closeDrawer(index)}/>}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/AppActions';

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
)(NavigationDrawer);