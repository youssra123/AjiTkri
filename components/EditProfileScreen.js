import React from 'react';
import {View, Text, StyleSheet,AsyncStorage} from 'react-native'
import Credentials from './credentials';
import {Card,Button,TextInput} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import md5 from 'md5';


export default class EditProfileScreen extends React.Component{
    constructor(props){
        super(props),
        this.state = { 
            loading: false,
            email:'',
            telephone:'',
            id:0,
            nom:'',
            prenom:'',
            passwd:'',
            passwdNew:'',
            passwdNewConfirmation:'',
            password:'',
        
         };
         this.Edit=this.Edit.bind(this);
    }

    /*
    async componentDidMount() {
        await Font.loadAsync({
          'roboto_medium': require('../assets/fonts/Roboto-Medium.ttf'), 
        });
        this.setState({ loading: true });
      }

      */

     async componentDidMount() {
        try{
            AsyncStorage.getItem('user', (err, result) => {
                this.setState({
                    email:JSON.parse(result).email_user,
                    telephone:JSON.parse(result).telephone_user,
                    id:JSON.parse(result).id_user,
                    nom:JSON.parse(result).nom_user,
                    prenom:JSON.parse(result).prenom_user,
                    password:JSON.parse(result).pwd_user,

                });

              
            });
          }catch(error){
              alert(error)
          }
     }

     Edit(){
         let email=this.state.email;
         let tele=this.state.telephone;
         let nom=this.state.nom;
         let prenom=this.state.prenom;
         let request="context=users&action=update&id_user="+this.state.id+"&nom_user="+nom+"&prenom_user="+prenom+"&email_user="+email+"&telephone_user="+tele+" ";
         if(this.state.passwd != ''){
            if(md5(this.state.passwd) == this.state.password){
                if(md5(this.state.passwdNew) != this.state.password){
                    if(this.state.passwdNew==this.state.passwdNewConfirmation){
                      request="context=users&action=update&id_user="+this.state.id+"&nom_user="+nom+"&prenom_user="+prenom+"&email_user="+email+"&pwd_user="+md5(this.state.passwdNew)+"&telephone_user="+tele+" "; 
                    }
                }
            }
         }
         fetch((new Credentials()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: request
        }
    )
    .then(response => response.text())
    .then(data => {
        //alert(this.state.lastQuartier[0].max);
        fetch((new Credentials()).server+"?context=users&action=find&id_user="+this.state.id)
        .then(res => res.json())
        .then(res => {
            AsyncStorage.setItem('user', JSON.stringify(res));
            this.props.route.params.refresh();
            this.props.navigation.navigate('Profile');

        });

    })
    .catch(err => console.log(err))  


     }
      
    render(){
       
        return(
            <ScrollView style={{backgroundColor:'#e5dfdf'}}>
            <View style={styles.container}>
            <Card style={{paddingTop:20,paddingBottom:40}}>
                <Card.Content>
                <View style={styles.field}>
                    <TextInput label='Nom' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none" value={this.state.nom}  onChangeText={(nom) => this.setState({nom})}  />
                </View>
                <View style={styles.field}>
                    <TextInput  label='Prénom' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none" value={this.state.prenom}  onChangeText={(prenom) => this.setState({prenom})}  />
                </View>
                <View style={styles.field}>
                    <TextInput label='Email' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none" value={this.state.email}  onChangeText={(email) => this.setState({email})}  />
                </View>
                <View style={styles.field}>
                    <TextInput label='Téléphone' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none"  value={this.state.telephone}  onChangeText={telephone => this.setState({telephone})}  />
                </View>
                <View style={styles.field}>
                    <TextInput secureTextEntry={true} label='Mot de passe' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none" value={this.state.passwd}  onChangeText={(passwd) => this.setState({passwd})}  />
                </View>
                <View style={styles.field}>
                    <TextInput secureTextEntry={true} label='Nouveau mot de passe' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none" value={this.state.passwdNew}  onChangeText={(passwdNew) => this.setState({passwdNew})}  />
                </View>
                <View style={styles.field}>
                    <TextInput secureTextEntry={true} label='Confirmation du mot de passe' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                    autoCapitalize="none" value={this.state.passwdNewConfirmation}  onChangeText={(passwdNewConfirmation) => this.setState({passwdNewConfirmation})}  />
                </View>
                
                </Card.Content>
                <Card.Actions>
                <View style={{paddingTop:20, width:'100%',justifyContent:'center', alignItems:'center'}}> 
                <Button type='contained' style={styles.button} onPress={this.Edit}>
                    <Text style={{color:'#fff'}}>Valider</Text>
                </Button>
                </View>
                </Card.Actions>
            </Card>
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
   
  
   
    field:{
        paddingTop:10,
        paddingBottom:10,
       
    },
    label:{
        fontSize:15,
        margin:5,
    },
    button: {
        backgroundColor:'#357376',
        width:'100%',

    },
   
 })