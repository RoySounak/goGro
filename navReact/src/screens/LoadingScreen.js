import React, { Component } from 'react';
import { Button, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }


class LoadingScreen extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate("Intro")
            }else{
                this.props.navigation.navigate("Signup")
            }
        })
    }
render(){
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='large' color='red'/>
        </View>
    );
}

} 
export default LoadingScreen;