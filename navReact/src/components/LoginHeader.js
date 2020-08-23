import React,{Component} from 'react';
import { Text, View,Alert } from 'react-native';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import Constant from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function LoaginHeader () {
    const navigation = useNavigation();
    //marginTop:Constant.statusBarHeight (used in view style)
    //marginTop:0.5
      return (
  
        <View style={{marginTop:Constant.statusBarHeight,backgroundColor: 'white',
              flexDirection:'row', justifyContent:"space-between",elevation:12}}>
    
          <View style={{flexDirection:"row",margin:5}}>
            <MaterialIcons style={{marginLeft:3}} name="local-grocery-store" size={32} color="red" />
            <TouchableOpacity onPress={()=>{Alert.alert("WelCome To goGro")}}>
            <Text style={{fontSize:20,marginLeft:2}}>Login</Text>
            </TouchableOpacity>
          </View>
    
          <View style={{flexDirection:"row",margin:6,justifyContent:"space-around", width:100}}>
            <AntDesign name="login" size={24} color="black" onPress={()=>navigation.navigate("Signup")}/>
          </View>
        </View>
      );
  
  }