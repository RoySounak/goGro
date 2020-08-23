/*import * as React from 'react';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';

export default class Product extends React.Component {
  render() {
    <Header/>
    return <WebView source={{ uri: 'https://piebym.com/gogro/shop/' }} />;
  }
}*/



///New Web View


import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {
  BackHandler
} from 'react-native';
import Header from '../components/Header';
import Constant from 'expo-constants';

export default class AllCat extends Component {

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
        source={{ uri: "https://piebym.com/gogro/all-categories-2/" }}
        ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
     />
    </React.Fragment>

    )

 }
}