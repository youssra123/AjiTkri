import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image,Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Ionicons } from '@expo/vector-icons';
import { DataTable,Searchba,Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import { Subtitle } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class AfficheDOffre extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            titre_detail:"",
            sous_titre_detail:'',
            description_detail:'',
            prix:'',
            date:'',
            prenom_user:'',
            nom_user:'',
            email_user:'',
            telephone_user:''


    }   
    this.arrayholder = [];
   
  
      }
  
  
      componentDidMount() {
      
        this.setState({
            titre_detail: this.props.route.params.of.titre_detail.toString(),
            sous_titre_detail: this.props.route.params.of.sous_titre_detail.toString(),
            description_detail: this.props.route.params.of.description_detail.toString(),
            prix: this.props.route.params.of.prix_offre,
            date:this.props.route.params.of.date_offre,
            prenom_user:this.props.route.params.of.prenom_user,
            nom_user:this.props.route.params.of.nom_user,
            email_user:this.props.route.params.of.email_user,
            telephone_user:this.props.route.params.of.telephone_user,

        },this.cla);
        
     
        console.log("titre_detail d'offre: "+this.state.titre_detail);
        console.log("sous_titre_detail d'offre: "+this.state.sous_titre_detail);
        console.log("description_detail d'offre: "+this.state.description_detail);
      }
    cla(){
     
        console.log("cla titre_detail d'offre: "+this.state.titre_detail);
        console.log("cla sous_titre_detail d'offre: "+this.state.sous_titre_detail);
        console.log("cla description_detail d'offre: "+this.state.description_detail);  
    }
 
    render(){
  
            const {of}=this.props.route.params
              return (
                <ScrollView>
        
             <Card>
                
                
             <Card.Title /*title="Card Title" subtitle="Card Subtitle"*/  />
             <Card.Content>
         
           
             <Title  style={{fontWeight: 'bold',color:'#2a7886',textAlign: 'center'}}> Informations d'utilisateur </Title>
             <Text>{"\n"}</Text>
             <Text  style={{ justifyContent: 'center',alignItems: 'center',textAlign: 'center'}}><Image
          source={{uri: 'https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png',}}
          //borderRadius style will help us make the Round Shape Image
          style={{ justifyContent: 'center',alignItems: 'center', width: 40, height: 40, borderRadius: 40 / 2 ,}}
        /> </Text>
         <Text style={{textAlign:'center'}}>
             <Text style={{fontWeight: 'bold'}}> nom complet : </Text>
         {this.state.nom_user} {this.state.prenom_user} </Text>
   <Text  style={{textAlign: 'center'}} ><Text style={{fontWeight: 'bold'}}> email : </Text>{this.state.email_user} </Text>
   <Text  style={{textAlign: 'center'}} ><Text style={{fontWeight: 'bold'}}> Téléphone : </Text>{this.state.telephone_user} </Text>
   <Text>{"\n"}</Text>
         <Title style={{fontWeight: 'bold',color:'#2a7886',textAlign: 'center'}}> Informations d'offre</Title>
         <Text>{"\n"}</Text>
         <Text><Text style={{fontWeight: 'bold'}}>Prix : </Text>{this.state.prix} <Text style={{fontWeight: 'bold'}}>DH</Text></Text>
          <Text ><Text style={{fontWeight: 'bold'}}>Date d'offre : </Text> {this.state.date}</Text>
               <Text><Text style={{fontWeight: 'bold'}}>Titre d'offre : </Text>{this.state.titre_detail} </Text>
               <Text ><Text style={{fontWeight: 'bold'}}>Sous Titre d'offre :</Text>{this.state.sous_titre_detail}
               
               </Text>
               <Text  style={{fontWeight: 'bold'}}>Description:
               
               </Text>
              
               <Paragraph>{this.state.description_detail}</Paragraph>
         
             </Card.Content>
             <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            
             <View style={{padding:20,flexDirection:'row',justifyContent:'center'}}>
          <TouchableOpacity  onPress={()=> 
               this.props.navigation.navigate('Commentaires',{offre:of})}>
          <View style={{justifyContent:'center', padding:5}}>
              <Ionicons  name='md-text' size={24} color='#357376'></Ionicons>
              </View>          
          </TouchableOpacity>
               </View>
            
            
           </Card>
           </ScrollView>
           );
          }
        
              
       
    
}
const styles = StyleSheet.create({
    form:{
        padding:20,
    },
    input: {
        height: 40,
        borderColor: '#bdc3c7',
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius:3,

    },
    button: {
        backgroundColor: '#1abc9c',
        padding: 8,
        color: "#fff",
        textAlign: 'center',
        width: 120,
        marginRight: 5,
        alignSelf: 'flex-end',
        marginTop:20,
        borderRadius:3,

    },
    field:{
      paddingTop:20,
    },
    label:{
        fontSize:15,
        margin:5,
    },
    container: {  
        flex: 1,  
        justifyContent: 'center',  
    },  
      headerText: {  
        fontSize: 20,  
        textAlign: "center",  
        margin: 10,  
        fontWeight: "bold"  
    },  
    TextInputStyle: {  
        textAlign: 'center',  
        height: 40,  
        borderRadius: 10,  
        borderWidth: 2,  
        borderColor: '#009688',  
        marginBottom: 10  
    },
    sousTitre: { 
      textAlign: 'center',  
      height: 40,  
    
      marginBottom: 10  
  } ,
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0dcdc',
  },
  text: {
    marginTop: 30,
    fontSize: 40,
    color: '#0250a3',
    fontWeight: 'bold',
  }, 
})