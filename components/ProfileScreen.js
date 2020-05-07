import React from 'react';
import {View, Text, StyleSheet,ImageBackground,Image,AsyncStorage,TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { Content, Left, Right,ListItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Credential from './credentials'
import Authentication from './auth'
import {Card,IconButton} from 'react-native-paper'
import { FileUploader } from './FileUploader';
import * as Permissions from 'expo-permissions';
import Credentials from './credentials'





export default class ProfileScreen extends React.Component{


    constructor(props){
        super(props)
        this.state={
            nom:'',
            prenom:'',
            telephone:'',
            email:'',
            client:null,
            id:0,
            localUri:null,
            visible: false,
            donnees:null,
            imgprofil:null
            
            
        }
        this.logOut=this.logOut.bind(this)
    }
       
    logOut(){
        AsyncStorage.setItem('user',null);
        this.props.navigation.navigate('Identification',{screen:"Connexion"})
       
    }
        componentDidMount(){
                 
           
            this.getPermissionAsync();
            if((new Authentication().isAuthenticated())){
                this.props.navigation.navigate('Identification',{screen:"Connexion"});
            }
            let user;
            try{
                AsyncStorage.getItem('user', (err, result) => {
                    this.setState({
                        client:JSON.parse(result),
                        nom:JSON.parse(result).nom_user,
                        prenom:JSON.parse(result).prenom_user,
                        telephone:JSON.parse(result).telephone_user,
                        email:JSON.parse(result).email_user,
                        id:JSON.parse(result).id_user,
                        //localUri:JSON.parse(result).image_user,
                    });
                  
                });

               
               
               

              }catch(error){
                  alert(error)
              }


              this.props.navigation.setOptions({
                headerRight: () => (
                    <View  style={{padding:18,flexDirection:'row'}}>
                      
                    <TouchableOpacity style={{justifyContent:'center',borderColor:'#fff',alignItems:'center',marginRight:20}} 
                    onPress={() => this.props.navigation.navigate('Edit',this.props.navigation.setOptions={
                        refresh: this.getData.bind(this),
                    })} >
                      <Ionicons  name='md-create' size={20} color='#fff'></Ionicons>
                      </TouchableOpacity>
                      <TouchableOpacity style={{justifyContent:'center',borderColor:'#fff',alignItems:'center'}} 
                    onPress={this.logOut} >
                      <Ionicons  name='md-log-out' size={20} color='#fff'></Ionicons>
                      </TouchableOpacity>
                     
                  </View>

                    
                ),
              });

             

              } 
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Connexion');
     };   

   getData=()=>{
        try{
            AsyncStorage.getItem('user', (err, result) => {
                this.setState({
                    nom:JSON.parse(result).nom_user,
                    prenom:JSON.parse(result).prenom_user,
                    telephone:JSON.parse(result).telephone_user,
                    email:JSON.parse(result).email_user,
                }); 
            });
          }catch(error){
              alert(error)
          }
    }

    /*
       openImagePickerAsync = async () => {
           
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (pickerResult.cancelled === true) {
          return;
        }
        this.setState({
            localUri: pickerResult.uri
        });
     
        /*
        fetch((new Credential()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, *//*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=users&action=update&id_user=1&image_user="+this.state.localUri,
        }
        //setSelectedImage({ localUri: pickerResult.uri });
        )
        



        alert(JSON.stringify(pickerResult))
        let data = pickerResult;
        let fileUploader = new FileUploader();
        fileUploader.fileName = pickerResult; // nom de fichier a uploader
        fileUploader.fileData = data; /// les donnes sources de l'image
        await fileUploader.upload()
            .then(data => {
                alert('ok')
                console.log(data); // le retour de la requet 200 si OK
            })
            .catch(err => {
                alert('ko')
                console.log(err); // si il'ya un erreur au niveau de connexion
            })

    
    }
*/

getPermissionAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
  }

  _pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true,
      exif:true
    });

    if (!result.cancelled) {
      this.setState({ localUri: result.uri});
    }
    let n = this.state.localUri.search("ImagePicker");
    let nb=n+12;
    let res = this.state.localUri.substr(nb);
    let d= `data:image/jpg;base64,${result.base64}`;
    console.log(this.state.localUri)
    console.log(res)
    this.setState({
        imgprofil:d
    })
    
    let fileUploader = new FileUploader();
    fileUploader.fileName = res; 
    fileUploader.fileData = d;
        await fileUploader.upload()
        .then(data => {
            alert('ok')

        })
        .catch(err => {
            alert('ko')
            console.log(err); 
        })

        
  };

    render(){
      
        if (this.state.imgprofil !== null) {
            return ( 
              <ScrollView>
                  <KeyboardAvoidingView>
              <View style={styles.container}>
                <View style={{height:280}}>
              <ImageBackground source={require('../assets/back.jpg')} style={styles.card}>
              <View style={styles.headerContent}>
              <TouchableOpacity onPress={this._pickImage}>
              <Image style={styles.avatar}
                    source={{uri:'http://192.168.43.180:99/gamezone/apiprovider/uploads/645481ae-87ae-4b15-9576-2bf8d9d22f0f.jpg'}}/>
              </TouchableOpacity>
              <Text style={styles.name}>{this.state.nom}  {this.state.prenom}</Text> 
              </View> 
              </ImageBackground>
              </View>
               <View >
              </View>
            
              
              </View>
              </KeyboardAvoidingView>
              </ScrollView>
            );
          }

        return(
            <ScrollView style={{backgroundColor:'#e5dfdf'}}>
                <KeyboardAvoidingView>
            <View style={styles.container}>
            <View style={{height:280}}>
            <ImageBackground source={require('../assets/back.jpg')} style={styles.card}>
            <View style={styles.headerContent}>
            <TouchableOpacity onPress={this._pickImage}>
            <Image style={styles.avatar}
                  source={require('../assets/avatar.png')}/>
            </TouchableOpacity>
            <Text style={styles.name}>{this.state.nom}  {this.state.prenom}</Text> 
            </View> 
            </ImageBackground>
            </View>
             <View style={{padding:10}}>
             <Card>
                <Card.Content>
                
            <View style={styles.item}>
                <Ionicons name='md-call' style={{fontSize: 32}}  color='#357376' />
                <View style={styles.content}>
                <Text style={styles.data}>{this.state.telephone}</Text>
                </View>
            </View>
            
            <View style={styles.item}>
                <Ionicons name='md-mail' style={{fontSize: 32}}  color='#357376' />
                <View style={styles.content}>
                <Text style={styles.data}>{this.state.email}</Text>
                </View>
            </View>
          
           
            </Card.Content>
               
            </Card>
           
            </View>
           
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}


const styles=StyleSheet.create({
    img:{
        
    },
    name:{
       fontSize:20,
       color:'#46185f',
    },
    content:{
      paddingLeft:20,
      paddingTop:5,
    },
    data:{
        fontSize:18,
        color:'#576574',
    },
    list:{
        width:'100%',

    },
    card:{
        height:150,
        width:'100%',
    },
    container:{
        flex:1,
        flexDirection:'column', 
    },
    headerContent:{
        padding:50,
        alignItems: 'center',
      },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 0.5,
        borderColor: "#46185f",
        marginBottom:10,
        marginTop:40,
      },
     item:{
         flexDirection:'row',
         paddingBottom:20,
         paddingTop:10
    },
})

