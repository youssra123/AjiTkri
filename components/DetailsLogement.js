import React from 'react';
import {View, StyleSheet,Button,Alert} from 'react-native';
import { Container, Footer, Content, Card, CardItem, Body, Text, AsyncStorage } from 'native-base';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Credential from './credentials';
import { Ionicons } from '@expo/vector-icons';




export default class DetailsLogement extends React.Component{
    constructor(props){
        super(props);
        this.state={
         logement:null,

        }
        this.delete=this.delete.bind(this);
        this.addToOffre=this.addToOffre.bind(this);
        this.edit=this.edit.bind(this);


    }

    refresh(){
      this.props.route.params.refresh();
    }

    delete(id){
        fetch((new Credential()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=logements&action=delete&id_logement="+id,
        }
    )
    .then(response => response.json())
    .then(data => {
        this.props.route.params.refresh();
        this.props.navigation.navigate('Logements');
    })
    .catch(err => console.log(err))

    }

   async addToOffre(id){
      this.props.navigation.navigate('DetailScreen',{id_logement:id});
    }

    edit(logement){

        this.props.navigation.navigate('ModifierLogement', {log:logement,refresh:this.refresh.bind(this)});
    }



    render(){
        const { logement } = this.props.route.params;
        let m='';
        if(logement.meuble==1){
            m='Oui';
        }else{
            m='Non';
        }

        return(
          <ScrollView >
        <Container style={{justifyContent:'center',backgroundColor:'#e5dfdf'}}>
        <Content style={{padding:10}}>
          <Card >
            <CardItem>
              <Body>
              <View style={{flexDirection:'row' ,paddingTop:20,paddingBottom:20}}>
                            <Ionicons name='md-home' size={20} color='#357376'>
                            </Ionicons>
                <Text style={styles.title}>
                   {logement.designation_type}
                </Text>
                </View>
                <View style={{flexDirection:'row' ,paddingBottom:20}}>
                            <Ionicons name='md-pin' size={20} color='#357376'>
                            </Ionicons>
                <Text style={styles.title}>{logement.nom_quartier}, {logement.num_rue_quartier} {logement.nom_ville}</Text>
               </View>
               <View style={{flexDirection:'row' ,paddingBottom:20}}>
                            <Ionicons name='md-information-circle' size={20} color='#357376'>
                            </Ionicons>
                <Text style={styles.title}>Informations supplémentaires</Text>
                </View>
               <View style={{ paddingBottom:15,paddingLeft:30}}>
               <Text style={styles.subtitle}>Nombre de pièces: {logement.nbr_pieces_logement}</Text>
               </View>
               <View style={{paddingBottom:15,paddingLeft:30}}>
               <Text style={styles.subtitle}>Surface: {logement.surface_logement} m²</Text>
               </View>
               <View style={{paddingBottom:15,paddingLeft:30}}>
               <Text style={styles.subtitle}>Etat:{logement.etat}</Text>
               </View>
               <View style={{paddingBottom:15,paddingLeft:30}}>
               <Text style={styles.subtitle}>Meublé: {m}</Text>
               </View>
               
          <View style={{paddingTop:20,flexDirection:'row',alignSelf:'flex-end'}}>
          <TouchableOpacity style={{width:40}} onPress={(e)=> {

                Alert.alert(
                    'Confirmer la suppression',
                    'Voulez vous supprimer ce logement?',
                    [
                    
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.delete(logement.id_logement)},
                    ],
                    {cancelable: false},
                  );

          }}>
            <View style={{justifyContent:'center', padding:5}} >
              <Ionicons  name='md-trash' size={18} color='#ff4757'></Ionicons>
              </View>          
              
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.edit(logement)}>
          <View style={{justifyContent:'center', padding:5}}>
              <Ionicons  name='md-create' size={18} color='#1e90ff'></Ionicons>
              </View>          
          </TouchableOpacity>
               </View>
              </Body>
            </CardItem>
          </Card>
          {(! logement.is_valid) && (
          <View style={{padding:3}}>
          <TouchableOpacity  style={styles.button} onPress={()=>this.addToOffre(logement.id_logement)}>
              <Text style={styles.text}>+ Ajouter à une offre</Text>
          </TouchableOpacity>
        </View>
          )}
          
        </Content>
        
      </Container>
      </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
  
    text:{
        color:"#fff",
        fontSize:12,
        
    },
    button:{
      backgroundColor:'#357376',
      alignItems:'center',
      padding:9,
      borderRadius:5

    },
    title:{
      paddingLeft:15,
      fontSize:16
    },
    subtitle:{
      fontSize:15,
      fontFamily: 'sans-serif-thin',

    }
    
})