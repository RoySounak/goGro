import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import Essentials from './src/screens/Essentials';
import AllCat from './src/screens/AllCat';
import Camera from './src/screens/Camera';
import Add from './src/screens/Add';
import More from './src/screens/More';
import Header from './src/components/Header';
import SigninHeader from './src/components/SigninHeader';
import LoginHeader from './src/components/LoginHeader';
import Card from './src/components/Card';
import Intro from './src/screens/Intro';
import { Feather } from '@expo/vector-icons'; 
import Signup from './src/screens/Signup';
import LoadingScreen from './src/screens/LoadingScreen';
import Login from './src/screens/Login';
import New from './src/screens/New';
import LandingPage from './src/screens/LandingPage';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();



function rootHome(){
  return(
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({  color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Add') {
          iconName = 'plus-circle';
        } else if (route.name === 'Camera') {
          iconName = 'camera';
        } else if (route.name === 'More') {
          iconName = 'more-vertical';
        }
        // You can return any component that you like here!
        return <Feather name={iconName} size={22} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    }}
    >
      <Tabs.Screen name="Home" component={Home}/>
      <Tabs.Screen name="Add" component={Add}/>
      <Tabs.Screen name="Camera" component={Camera}/>
      <Tabs.Screen name="More" component={More} />
    </Tabs.Navigator>
  )
}

export default class App extends React.Component {
  render(){
    return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Intro" >
        <Stack.Screen name="rootHome" component={rootHome} />
        <Stack.Screen name="Intro" component={Intro}/>
        <Stack.Screen name="Product" component={Product}/>
        <Stack.Screen name="Essentials" component={Essentials}/>
        <Stack.Screen name="AllCat" component={AllCat}/>
        <Stack.Screen name="Header" component={Header}/>
        <Stack.Screen name="SigninHeader" component={SigninHeader}/>
        <Stack.Screen name="LoginHeader" component={LoginHeader}/>
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Camera" component={Camera} />

        <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="New" component={New} />
        <Stack.Screen name="LandingPage" component={LandingPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}
