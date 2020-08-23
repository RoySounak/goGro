import React, { Component } from 'react';
import { Button, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { Item, Input, Label } from 'native-base';
import Constant from 'expo-constants';
import LoginHeader from '../components/LoginHeader';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
class Login extends Component {
  state={
      emailid:"",
      password:""
  }
  userLogin(emailid,password){

    firebase.auth().signInWithEmailAndPassword(emailid, password).then(()=>{
        this.props.navigation.navigate("LandingPage")
      })
      .catch(error=>{
          Alert.alert(error.message)
      })
  }  
  async loginWithFacebook() {

    //ENTER YOUR APP ID 
    await Facebook.initializeAsync('1160136127671680');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).then(()=>{
        this.props.navigation.navigate("LandingPage");
    })
      .catch((error) => {
        console.log(error)
      })
    }
  }
  render() {
    return (
      <View 
       behavior='position'
      style={{ flex: 1, justifyContent: 'flex-start'}}>
        <LoginHeader/>
        <Item floatingLable style={{borderBottomColor:"blue"}}>
            <Label>
                Email Id
            </Label>
            <Input 
                value={this.state.emailid}
                onChangeText={(text)=>this.setState({emailid:text})}
            />
        </Item>
        <Item floatingLable>
            <Label>
                Password
            </Label>
            <Input 
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text)=>this.setState({password:text})}
            />
        </Item>
        <View style={{margin:20, justifyContent:"center"}}>
            <Button title="Log In" color="#0cc964"
            onPress={()=>this.userLogin(this.state.emailid,this.state.password)}/>
        </View>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity
            onPress={() => this.loginWithFacebook(this.state.credential)}
          >
            <Text style={{fontSize:18}}>Login With Facebook</Text>
          </TouchableOpacity>
          <View style={{alignItems:'center',marginTop:15}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={{fontSize:18}}>Don't Have An Account?</Text>
        </TouchableOpacity >
        </View>
        </View>
        <View style={{alignItems:'center', marginTop:10}}>
            <Image source={require('../ImageSrc/login.jpg')} style={{width:270,height:330,borderRadius:25}}/>
        </View>
      </View>
    );
  }
}

export default Login;