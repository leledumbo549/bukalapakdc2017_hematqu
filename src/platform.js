import { Actions } from 'react-native-router-flux';
import {
  AsyncStorage,
  Linking,
  Alert,
  Dimensions
} from 'react-native';

function getActions() {
  return Actions;
}

module.exports.historyPush = function(path) {
  const str = "getActions()."+path+"({now:Date.now()})";
  eval(str);  
}

module.exports.historyPushByParam = function(path,param) {
  const str = "getActions()."+path+"(param)";
  eval(str);  
}

module.exports.historyReplace = function(path) {
  const str = "getActions()."+path+"({type: 'replace'})";
  eval(str);  
}

module.exports.historyPop = function() {
  getActions().pop();
}

module.exports.historyPopTwice = function() {
  getActions().pop({popNum:2});
}


module.exports.historyRefresh = function() {
  getActions().refresh();
}

module.exports.getStorage = function() {
  return AsyncStorage;
}

module.exports.openURL = function(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
}

module.exports.alertOK = function(title,msg) {
  Alert.alert(
    title,
    msg,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  );
}

var {height, width} = Dimensions.get('window');
var vw = width / 100;

module.exports.vw = vw;