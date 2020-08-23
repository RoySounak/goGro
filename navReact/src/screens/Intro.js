import React, {Component} from 'react';
import {StyleSheet, Text, View, Button,ImageBackground,TouchableOpacity} from 'react-native';


export default class Intro extends Component {

  render() {
    return (     
      <View style={styles.container}>
        <ImageBackground source={require('../ImageSrc/Success.png')} style={styles.backImage}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LandingPage')}>
            <Text style={styles.signinText}>Welcome To Our goGro App</Text>
        </TouchableOpacity >
        </ImageBackground>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  signinText:{
    color:'black',
    fontSize: 30,
    fontWeight:"bold",
    alignItems:'stretch'
  },
  backImage:{
    flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF9B0',
  },
});