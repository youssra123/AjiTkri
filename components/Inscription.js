import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Credentials from './credentials';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton} from 'react-native-paper';
import { Left, Right } from 'native-base';
import {Card, TextInput,Button ,Avatar,icon} from 'react-native-paper';
import md5 from 'md5';


export default class Inscription extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: null,
            nom : '',
            prenom:'',
            email:'',
            password : '',
            telephone:'',
            passwordConf:'',
            checked:'locataire'
        }
        this.doRegister=this.doRegister.bind(this);
    }

    doRegister(){
        let nom=this.state.nom;
        let prenom=this.state.prenom;
        let email=this.state.email;
        let password=this.state.password;
        let tele=this.state.telephone;
        let type=this.state.checked;
        if(this.state.password==this.state.passwordConf){
        fetch((new Credentials()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=users&action=insert&nom_user="+nom+"&prenom_user="+prenom+"&email_user="+email+"&pwd_user="+md5(password)+"&telephone_user="+tele+" "+"&type_user="+type,
        }
    )
    .then(response => response.json())
    .then(response => {
       this.props.navigation.navigate('Connexion');
       //alert("done!!!!")
    })
    .catch(err => console.log(err))
}else{
    alert("les mots de passe ne se correspondent pas!!")
}
    }
    render() {
        const { checked}=this.state;
        return (
            <ScrollView style={{backgroundColor:' e5dfdf'}}>
            <View style={styles.container}>
            <Card style={{paddingTop:20,paddingBottom:40}}>
            <Card.Title  title="Inscrivez-vous" subtitle="sur AjiTkri" 
            subtitleStyle={{paddingLeft:20}} titleStyle={{paddingLeft:20}} 
            left={(props) => <Avatar.Image size={60} style={{backgroundColor:'#46185f'}} source={require('../assets/img.png')}  />} />
                <Card.Content >
                <View style={styles.field}>
                    <TextInput  label='Nom' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={(nom) => this.setState({nom})}  
                     />
                </View>
                <View style={styles.field}>
                    <TextInput  autoCapitalize="none" label='Prénom' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={prenom => this.setState({prenom})}  />
                </View>
                <View style={styles.field}>
                    <TextInput   label='Téléphone' mode='flat'  style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={telephone => this.setState({telephone})}  />
                </View>
                <View style={styles.field}>
                    <TextInput  autoCapitalize="none" label='Email' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={email => this.setState({email})}  />
                </View>
                <View style={styles.field}>
                    <TextInput secureTextEntry={true} autoCapitalize="none" label='Mot de passe' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={password => this.setState({password})} />
                </View>
                <View style={styles.field}>
                    <TextInput secureTextEntry={true} autoCapitalize="none" label='Confirmation du mot de passe' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={passwordConf => this.setState({passwordConf})} />
                </View>
                <View >
                <View style={styles.radio}>
                <Left>
                        <Text>Locataire</Text>
                    </Left>
                    <Right>
                <RadioButton
                        color='#357376'
                        value="locataire"
                        status={checked === 'locataire' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'locataire' }); }}
                        />
                </Right>
                </View>
                <View style={styles.radio}>
                <Left>
                        <Text>Propriétaire</Text>
                    </Left>
                    <Right>
                <RadioButton
                        color='#357376'
                        value="proprietaire"
                        status={checked === 'proprietaire' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checked: 'proprietaire' }); }}
                        />
                </Right>
                </View>
                </View>
                </Card.Content>
                <Card.Actions>
                <View style={{paddingTop:20, width:'100%',justifyContent:'center', alignItems:'center'}}> 
                <Button type='contained' style={styles.button} onPress={this.doRegister}>
                    <Text style={{color:'#fff'}}>S'enregistrer</Text>
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
    radio:{
        paddingTop:20,
        flexDirection:'row',
    },
    container:{
        padding:10,
        paddingBottom:20,
    },
   
  
   
    field:{
        paddingTop:10,
        paddingBottom:20,
       
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