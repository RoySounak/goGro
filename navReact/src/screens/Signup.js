import React, { Component } from 'react';
import { Button, View, Text, Alert,TouchableOpacity, Image} from 'react-native';
import { Item, Input, Label } from 'native-base';
import SigninHeader from '../components/SigninHeader';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

class Signup extends Component {
  state={
    emailid:"",
    password:""
  }
  userSignup(emailid,password){

      firebase.auth().createUserWithEmailAndPassword(emailid,password).then(()=>{
          this.props.navigation.navigate("LandingPage")
      })
      .catch(error=>{
          Alert.alert(error.message)
      })
  }  
  render() {
    return (
      
      <View 
       behavior='position'
      style={{ flex: 1, justifyContent: 'flex-start'}}>
          <SigninHeader/>
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
            <Button title="Sign Up"  color="#0cc964"
            onPress={()=>this.userSignup(this.state.emailid,this.state.password)}/>
        </View>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{fontSize:18}}>Already Have An Account?</Text>
        </TouchableOpacity >
        </View>
        <View style={{alignItems:'center', marginTop:15}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('New')}>
            <Text style={{fontSize:18}}>Want to Login With Phone Number?</Text>
        </TouchableOpacity >
        </View>
        <View style={{alignItems:'center', marginTop:10}}>
            <Image source={require('../ImageSrc/signin.jpg')} style={{width:270,height:330,borderRadius:25}}/>
        </View>    
      </View>
    );
  }
}

export default Signup;