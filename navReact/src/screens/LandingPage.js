import React, { Component } from 'react';
import { Button, View, Text, Image,Alert , TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

class LandingPage extends Component {
  state={
    email:"",
    displayName:"",
    photoURL:"",
    currentUser:null
  }
  componentDidMount(){
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setState({
          email:user.email,
          displayName:user.displayName
        })
      }else{
        this.props.navigation.replace("Login")
      }
      console.log(user);
    })
  }
  userSignout(){
    firebase.auth().signOut().catch(error=>{Alert.alert(error.message)})
  }
  render() {
    const { currentUser } = this.state
    //{currentUser && currentUser.email} <Text> btween
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
    <Text style={{fontSize:23}}>😊😊Hope! Your Are Doing Well😊😊
    </Text>
        <View style={{alignItems:'center'}}>
            <Image source={require('../ImageSrc/order.jpg')} style={{width:250,height:300,borderRadius:25}}/>
        </View>
        <View style={{marginTop:70}}>
            <Button style ={{width:"250"}} title="Welcome" onPress={() => this.props.navigation.navigate('rootHome')}>
            </Button >
        </View>
      </View>
    );
  }
}

export default LandingPage;
