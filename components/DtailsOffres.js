import React from 'react';
import {View, StyleSheet,AsyncStorage,Button,Alert} from 'react-native';
import { Container, Footer, Content, Card, CardItem, Body, Text,FooterTab } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Credential from './credentials';




export default class DtailsOffres extends React.Component{
    constructor(props){
        super(props);
        this.state={
         offre:null,

        }
        this.delete=this.delete.bind(this);
    }

    delete(offre){
        alert(
            'Confirmer la suppression',
            'Voulez vous supprimer cet offre?',
            [
             
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'yes', 
              onPress:()=> {
                fetch((new Credential()).server+"?",
                {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                    body: "context=details&action=delete&id_detail="+offre.id_detail,
                }
            )
            .then(data => response.json())
            .then(data => {
                this.props.navigation.navigate('MesOffres');
            })
            .catch(err => console.log(err))
                fetch((new Credential()).server+"?",
                        {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                            body: "context=offres&action=delete&id_offre="+offre.id_offre,
                        }
                    )
                    .then(data => response.json())
                    .then(data => {
                        this.props.navigation.navigate('MesOffres');
                    })
                    .catch(err => console.log(err))
            
              }
            
            },
            ],
            {cancelable: false},
          );
      
       
     

    }



    render(){
        const { offre } =this.props.navigation.getParam('offre');
        console.log("params: "+ this.props.navigation.getParam('offre'));
        console.log("params prix: "+ this.props.navigation.getParam('offre').prix_offre);
        console.log("params date: "+ this.props.navigation.getParam('offre').date_offre);
        let m='';
       /* if(offre.is_valid==1){
            m='Oui';
        }else{
            m='Non';
        }*/
        return(
        <Container>
        <Content style={{padding:10}}>
          <Card >
            <CardItem>
              <Body>
                <Text>
               
                </Text>
                <Text>date_offre:{this.props.navigation.getParam('offre').date_offre}</Text>
               <Text> prix_offre: {this.props.navigation.getParam('offre').prix_offre}</Text>
            
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
        <TouchableOpacity style={styles.tabs} onPress={()=>{this.delete(this.props.navigation.getParam('offre'))}}>
                    
        <Text style={styles.text}>Supprimer</Text>
                    </TouchableOpacity>
      
              
         
          <TouchableOpacity style={styles.tabs}>
              <Text style={styles.text}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabs}>
              <Text style={styles.text}>Créer Offre</Text>
          </TouchableOpacity>
        </Footer>
      </Container>
        )
    }
}

const styles=StyleSheet.create({
    tabs:{
        alignItems:"center",
        justifyContent:"center",
        padding:20,
    },
    text:{
        color:"#fff",
    }
    
})