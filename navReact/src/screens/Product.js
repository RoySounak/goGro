/*import * as React from 'react';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import { View, Text } from 'native-base';

export default class Product extends React.Component {
  render() {

    
    return (
      <React.Fragment>
        <Header/>
        <WebView source={{ uri: 'https://piebym.com/gogro/shop/' }} />
      </React.Fragment>
      

    )
  }
}

*/

///New Web View


import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {
  BackHandler
} from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';

export default class Product extends Component {

constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
}

componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton = ()=>{
   this.WEBVIEW_REF.current.goBack();
   return true;
}

onNavigationStateChange(navState) {
  this.setState({
    canGoBack: navState.canGoBack
  });
}

render(){
   return (
    <React.Fragment>
      <Header/>
      <WebView style={{marginTop:1}}
        source={{ uri: "https://piebym.com/gogro/shop/" }}
        ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
     />
    </React.Fragment>
    )

 }
}