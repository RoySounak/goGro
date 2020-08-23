import React, { Component } from 'react';
import { StyleSheet, View, TextInput,  Button, Alert} from 'react-native';
import { Item, Input, Text, Label, ListItem,List} from 'native-base';
import Header from '../components/Header';
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import {firebaseConfig} from '../config';
import { ScrollView } from 'react-native-gesture-handler';
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

class Add extends Component {
  state={
    text:"",
    mylist:[],
    currentUser:null
  }
  componentDidMount(){
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    const myitems=firebase.database().ref("Product Name:  "+currentUser.uid);
    myitems.on("value",datasnap=>{
      //console.log(Object.values(datasnap.val()));
      if(datasnap.val()){
        this.setState({mylist:Object.values(datasnap.val())})
      }
    })
  }
  saveitem(){
    //console.log(this.state.text);
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    console.log(this.state.currentUser);
    const mywishlist=firebase.database().ref("Product Name:  "+currentUser.uid);
    mywishlist.push().set({
      text:this.state.text,
      time:Date.now()
    })
    this.setState({text:""})
  }
  deleteitem(){
    firebase.database().ref("mywishlist").remove();
    this.setState({mylist:[{text:"Deleted Successfully"}]})
  }
  showAlert1() {  
    Alert.alert(  
        'Confirmation',  
        'Save',  
        [   
          {text: 'OK', onPress: () => console.log('OK Pressed')},  
      ]  
        
    ) 
  }  
  render() {
    const wishlist = this.state.mylist.map(item=>{
      return(
        <ListItem style={{justifyContent:"space-between"}} key={item.time}>
          <Text>{item.text}</Text>
          <Text>{new Date(item.time).toDateString()}</Text>
        </ListItem>
      )
    })
    return(
      <ScrollView style={styles.screen}>
          <View>
          <Header/>
        <Item floatingLabel>
          <Label>Product Name</Label>
          <Input 
            value={this.state.text}
            onChangeText={(text)=>this.setState({text})}
          />
        </Item>
        <View style={{flexDirection:"row",padding:20,justifyContent:"space-around"}}>
        <Button rounded success 
          title='Add' style={styles.mybtn} onPress={()=>this.saveitem()} color="#0cc964"/>
        <Button rounded success 
          title='Delete All' style={styles.mybtn} onPress={()=>this.deleteitem()} color="#c90c52"/>
        </View>
        <List>
          {wishlist}
        </List>
        <View style={{marginBottom:10}}>
        <Button
          onPress={this.showAlert1}  
          title="Save"
          color="#adc90c"
        />
        </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  screen : {
    backgroundColor:"#FEF9B0",
    flex:1
  },
  mybtn:{
    padding:10,
    width:120,
    justifyContent:"center"
  }
});

export default Add;