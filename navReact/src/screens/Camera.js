import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constant from 'expo-constants';
import uuid from 'uuid';
import * as firebase from 'firebase';
import Header from '../components/Header';

console.disableYellowBox = true;

 export const firebaseConfig = {
    apiKey: "AIzaSyDj8fqUSx7LIHS8vW-kM6dOLig5HEp9_JQ",
    authDomain: "reactnative-e1f30.firebaseapp.com",
    databaseURL: "https://reactnative-e1f30.firebaseio.com",
    projectId: "reactnative-e1f30",
    storageBucket: "reactnative-e1f30.appspot.com",
    messagingSenderId: "297373253593",
    appId: "1:297373253593:web:1c12682de8ad6d3c9b23c8",
    measurementId: "G-PPH2ZPTRRX"   
  };   

//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

class Camera extends Component {
    state = {
        image: null,
        uploading: false,
        currentUser:null
      };
      
      async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
      }
      render() {
        let { image } = this.state;
    //style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} used in view
    //            <StatusBar barStyle="default" /> 76 lines after {this._maybeRenderUploadingOverlay()}
        return (
          <View>
            <Header/>
          <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:Constant.statusBarHeight, backgroundColor:"#FEF9B0"}}>
            {image ? null : (
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 20,
                  textAlign: 'center',
                  marginHorizontal: 15,
                }}>
                Capture Your Products Lists
              </Text>
            )}
    
            <Button
              onPress={this._pickImage}
              title="Pick an image from File"
              color="#0cc964"
              
            />
            <View style={{marginTop:20}}>
            <Button onPress={this._takePhoto} title="Take a photo" color="#c90c52"/>
            </View>
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
    

            
          </View>
          </View>
        );
      }
    
      _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
      };
    
      _maybeRenderImage = () => {
        let { image } = this.state;
        if (!image) {
          return;
        }
    
        return (
          <View
            style={{
              marginTop: 30,
              width: 250,
              borderRadius: 3,
              elevation: 2,
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: 'rgba(0,0,0,1)',
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: 'hidden'
              }}>
              <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
            </View>
    
            <Text
              onPress={this._copyToClipboard}
              onLongPress={this._share}
              style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
              {image}
            </Text>
          </View>
        );
      };
    
      _share = () => {
        Share.share({
          message: this.state.image,
          title: 'Check out this photo',
          url: this.state.image,
        });
      };
    
      _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
      };
    
      _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };
    
      _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };
    
      _handleImagePicked = async pickerResult => {
        const {currentUser} = firebase.auth();
        this.setState({currentUser});
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadUrl = await uploadImageAsync(pickerResult.uri);
            console.log(uploadUrl);
            this.setState({ image: uploadUrl });
            console.log(currentUser.uid);
          }
        } catch (e) {
          console.log(e);
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };
    }
    
    async function uploadImageAsync(uri) {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      
      const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());
        console.log(uuid)
      const snapshot = await ref.put(blob);
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await snapshot.ref.getDownloadURL();
}

export default Camera;