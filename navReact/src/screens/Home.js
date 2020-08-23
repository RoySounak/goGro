import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';

export default class Home extends React.Component {
  render(){
    return (
      <View style={{flex:1}}>
        <Header/>
        <Card/>
      </View>
    );
  }
}

