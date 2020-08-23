import React,{Component} from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import { MaterialIcons,Feather } from '@expo/vector-icons';
import Constant from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default  function Header () {
  const navigation = useNavigation();
  //marginTop:Constant.statusBarHeight (used in view style)
  //marginTop:0.5
  //onPress={() => navigation.navigate('AllCat')}
  //onPress={()=>{Alert.alert("WelCome To goGro")}}
    return (

      <View style={{marginTop:Constant.statusBarHeight,backgroundColor: 'white',
            flexDirection:'row', justifyContent:"space-between",elevation:12}}>
  
        <View style={{flexDirection:"row",margin:5}}>
          <MaterialIcons style={{marginLeft:3}} name="local-grocery-store" size={32} color="red" />
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize:20,marginLeft:2}}>goGro</Text>
          </TouchableOpacity>
        </View>
  
        <View style={{flexDirection:"row",margin:6,justifyContent:"space-around", width:100}}>
          <Feather
            name="camera" size={26} color="black" onPress={() => navigation.navigate('Camera')}/>

          <Feather 
            name="plus-circle" size={26} color="black" onPress={()=>navigation.navigate("Add")}/>
        </View>
      </View>
    );

}
