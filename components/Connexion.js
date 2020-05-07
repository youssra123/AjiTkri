import * as React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, AsyncStorage } from 'react-native';
import Credentials from './credentials';
import {Header} from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import Authentication from './auth'
import { TouchableRipple,IconButton,HelperText,Card,Title,Paragraph,Avatar, Button,ActivityIndicator,configureFonts,DefaultTheme,Provider as PaperProvider, TextInput } from 'react-native-paper';
import md5 from 'md5';


export default class Connexion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            username : '',
            password : ''
        }

        this.doLogin = this.doLogin.bind(this);

    }

    clearInputs=()=>{
        
        this.setState({
            username:'',
            password:'',
        })

    }

    componentDidMount(){
        this.clearInputs;

    }

    doLogin(){
        let email = this.state.username;
        let pwd = this.state.password;

   
        fetch((new Credentials()).server+"?context=users&action=find&email_user="
        +email+"&pwd_user="+md5(pwd))
        .then(res => res.json())
        .then(res => {
            if(res.id_user != null){ 
                 AsyncStorage.setItem('user', JSON.stringify(res));
                 if(res.type_user == 'proprietaire'){
                this.props.navigation.navigate('Espace locateur',{
                    screen:'Profile',
                    
                });
    
            }else{
                this.props.navigation.navigate('Espace locataire',{screen:'Profile',
                  });
                 }
                
            }else{
                alert("Email ou mot de passe incorrect");
            }
        })
        .catch(err => {
            alert("Could not connect to server");
        })
    }

    render() {
        return (

            <ScrollView style={{backgroundColor: '#e5dfdf'}}>
            <View >
            <View style={styles.container}>
            <Card style={{paddingTop:20,paddingBottom:30}}>
                
                    <Card.Content >
                        <View style={{paddingBottom:20}}>
                            <TextInput   label='Email' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                            autoCapitalize="none"  onChangeText={(username) => this.setState({username})}  />
                        
                        </View>
                        <View 
                        
                        style={{paddingBottom:20}}>
                            <TextInput autoCapitalize="none" label='Password' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                            secureTextEntry={true}  onChangeText={password => this.setState({password})}  />
                        </View>
            
                    </Card.Content>
                <Card.Actions>
                <View style={styles.field}> 
                        <Button type='contained' onPress={this.doLogin} style={styles.button}>
                            <Text style={{color:'#fff'}}> Se connecter</Text>
                        </Button>
                        <Button uppercase={false} onPress={()=> console.log('pressed')} type='flat' style={{paddingTop:20}}>
                            <Text style={{color:'#357376'}}> Mot de passe oublié?</Text>
                        </Button>
                        </View>
                </Card.Actions>
            </Card>
            </View>
            </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
   container:{
    padding:10,
    paddingBottom:20,
       
   },
  
    input: {
        height: 40,
        borderColor: 'coral',
        paddingLeft: 10,
        borderWidth: 1,
      
    },
    button: {
        backgroundColor:'#357376',
        width:'100%',

    },
   
    field:{
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'

        
      },

      label:{
          fontSize:15,
          margin:5,
      }
})