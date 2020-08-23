import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Header from '../components/Header';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

export default class More extends React.Component {
  
  userSignout(){
  const { currentUser } = firebase.auth();
  this.setState({ currentUser });
    firebase.auth().signOut().catch(error=>{Alert.alert(error.message)})
  }
  render(){
    return (
      <View style={{flex:1}}>
          <Header/>
        <Text>More Tab Screen</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
            <Text style={{fontSize:23}}>😊Promise Me, We'll Meet Again😊
            </Text>
                
                <View >
                        <Button
                  title="Logout"
                  onPress={()=>this.userSignout()}
                />
                </View>
                
              </View>
      </View>
    );
  }
}

