import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  TextInput,
  Switch,
  processColor
} from 'react-native';

import { ArtyCharty } from 'arty-charty';

class DemoGraph extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }


  render() {
    const data = [];
    const arr = this.props.arr;
    for(let i=0;i<arr.length;i++) {
      data.push({value:arr[i]});
    }

    return (
      <View style={{backgroundColor: 'gainsboro'}}>
        <ArtyCharty 
        clickFeedback={true}
        data={[{
          type: 'line',
          data: data,
          highCol: 'gray',
          lineColor: 'crimson',
          drawChart: true
        },{
          type: 'bars',
          data: data,
          highCol: 'crimson',
          lineColor: 'crimson',
          drawChart: true
        }]}/>
      </View>
    );
  }
}

export default DemoGraph;