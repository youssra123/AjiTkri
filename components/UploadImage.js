import * as React from 'react';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

    
    
    export default function UploadImage() {
            let [selectedImage, setSelectedImage] = React.useState(null);
          
            let openImagePickerAsync = async () => {
              let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
          
              if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
              }
          
              let pickerResult = await ImagePicker.launchImageLibraryAsync();
          
              if (pickerResult.cancelled === true) {
                return;
              }
          
              setSelectedImage({ localUri: pickerResult.uri });
            };
          
            if (selectedImage !== null) {
              return (
                <View style={styles.container}>
                  <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                  />
                </View>
              );
            }
          
            return (
              <View >
                   <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={{width:100,height:100}} />
                    <Text >
                        To share a photo from your phone with a friend, just press the button below!
                    </Text>

                    <TouchableOpacity onPress={openImagePickerAsync} >
                        <Text>Pick a photo</Text>
                    </TouchableOpacity>              
                    </View>
            );
          }
          
          const styles = StyleSheet.create({
            /* Other styles hidden to keep the example brief... */
            thumbnail: {
              width: 300,
              height: 300,
              resizeMode: "contain"
            }
          });
    
