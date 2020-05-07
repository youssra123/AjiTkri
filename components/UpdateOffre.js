import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { DataTable,Searchbar} from 'react-native-paper';
import Credentials from './credentials'
import { ScrollView } from 'react-native-gesture-handler';

export default class UpdateOffre extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        data: [],
        date:'',
        prix : '',
        isValid: '0',
        idDetail:'',
        idLogement: '1',
        titre_detail:"",
        sous_titre_detail:null,
        description_detail:'',
        idUser:'1'
    }   
       this.doRegister=this.doRegister.bind(this);
        
      }
      componentDidMount() {
        
        this.setState({
            data: this.props.route.params.offre,
            titre_detail: this.props.route.params.offre.titre_detail.toString(),
            sous_titre_detail: this.props.route.params.offre.sous_titre_detail.toString(),
            description_detail: this.props.route.params.offre.description_detail.toString(),
            prix: this.props.route.params.offre.prix_offre+"",
        },this.cla);
        
     
      }
    cla(){
        console.log("cla data d'offre: "+this.state.data);
        console.log("cla titre_detail d'offre: "+this.state.titre_detail);
        console.log("cla sous_titre_detail d'offre: "+this.state.sous_titre_detail);
        console.log("cla description_detail d'offre: "+this.state.description_detail);  
        console.log("cla le prix: "+this.state.prix);  

    }
    doRegister(){
      
        
        console.log("register id_detail d'offre: "+this.state.data.id_detail); 
        console.log("register sous_titre_detail d'offre: "+this.state.sous_titre_detail); 
        console.log("register titre_detail d'offre: "+this.state.titre_detail);
         console.log("register description_detail d'offre: "+this.state.description_detail); 
         let titre_detail=this.state.titre_detail;
         let sous_titre_detail=this.state.sous_titre_detail;
         let description_detail=this.state.description_detail;
         let id_detail=this.state.data.id_detail;
         let prix=this.state.prix;
         fetch((new Credentials()).server+"?",
         {
         method: "POST",
         headers: {
             'Accept': 'application/json, text/plain, */*',
             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
         },
          body: "context=details&action=update&id_detail="+id_detail+"&titre_detail="+titre_detail+"&sous_titre_detail="+sous_titre_detail+"&description_detail="+description_detail,
          //  body: "context=offres&action=insert&date_offre="+date+"&prix_offre="+prix+"&is_valid="+isValid+"&id_detail="+idDetail,
         // update&condition=?&[column=?&...]
         }
     )
     .then(response => {response.json();
        console.log("response: "+response.json());
        })
     .then(data => {
        
     
        
     })
     .catch(err => console.log(err))
     fetch((new Credentials()).server+"?",
     {
     method: "POST",
     headers: {
         'Accept': 'application/json, text/plain, */*',
         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
     },
      body: "context=offres&action=update&id_offre="+this.state.data.id_offre+"&prix_offre="+prix,
      
     }
 )
 .then(response => {response.json();
    console.log("response: "+response.json());
    })
 .then(data => {
    
     this.props.navigation.navigate('Mes offres',{screen:'Offres'});
    
 })
 .catch(err => console.log(err))
    }
    render(){
        const {offre} =this.props.route.params
        return (
            <ScrollView>
            <View style={styles.form}>
                <View style={styles.field}>
            
                <Text style={styles.label1}>Update d'offre</Text>
                   
                </View>
                <View style={styles.field}>
                <Text style={styles.label}>titre_detail</Text>
                    <TextInput style={styles.TextInputStyle}  onChangeText={(titre_detail) => this.setState({titre_detail},this.cla)} value={this.state.titre_detail} />
                </View>
                <View style={styles.field}>

                    <Text style={styles.label}>sous_titre_detail</Text>
                    <TextInput  style={styles.TextInputStyle}  onChangeText={sous_titre_detail => this.setState({sous_titre_detail},this.cla)} value={this.state.sous_titre_detail} />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>description_detail</Text>
                    <TextInput
                        style={styles.AreaText}
                        placeholder=""
                        numberOfLines={10}
                        multiline={true}
                       // underlineColorAndroid='transparent'
                        onChangeText={description_detail => this.setState({description_detail},this.cla)}
                        value={this.state.description_detail}
                        />
                  
                </View>
               
       
                    <View style={styles.field}>

                    <Text style={styles.label}>prix offre</Text>
                    <TextInput  value={this.state.prix} style={styles.TextInputStyle}  onChangeText={prix => this.setState({prix},this.cla)} value={this.state.prix} />
                    </View>
                
                <TouchableOpacity>
                    <Text style={styles.button}  onPress={()=>{this.doRegister()}} >Suivant</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
          )
    }
}
const styles = StyleSheet.create({
    form:{
        padding:20,
    },
    input: {
        height: 40,
        borderColor: '#f1f3f4',
        paddingLeft: 10,
        borderWidth: 1,
        borderRadius:3,

    },
    button: {
        backgroundColor: '#2a7886',
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
     label1:{
        fontSize:30,
        fontWeight: 'bold',
        color: "#512b58",
        margin:5,
        textAlign: 'center', 
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
        borderColor: '#79bac1',  
        marginBottom: 10  ,
    },
    AreaText: {  
        textAlign: 'center',  
        borderRadius: 10,  
        borderWidth: 2,  
        borderColor: '#79bac1',  
     
    }
})