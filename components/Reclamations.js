import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import {Card,TextInput} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import Credentials from './credentials'

export default class Reclamation extends React.Component{
   /*
    render(){
        

        return(
            <View>
                <Text>{id_logement}</Text>
            </View>
        )
*/



        constructor(props){
            super(props)
            this.state = {
            data: null,
            sujet_reclamation : '',
            isValid: '0',
            idUser:'1'
        }   
            this.doRegister=this.doRegister.bind(this);
            
          }
          componentDidMount() {
            var that = this;
            
           

           /*
            fetch((new Credentials()).server+"?context=offres&action=findAll")
            .then(res => res.json())
            .then(res => {
                if(res.id_user != null){
                    this.props.navigation.navigate('Offres')
                }else{
                    alert("Email ou mot de passe incorrect")
                }
            })
            .catch(err => {
                    alert("Could not connect to server")
            })
            console.log("ici=");
           // console.log("id="+this.props.navigation.state.params.offre);
           */
          }



          async doRegister(){
            // res=await AsyncStorage.getItem('id_details');
            const {offre}=this.props.route.params
            try{
                AsyncStorage.getItem('user', (err, result) => {
                    this.setState({
                        idUser:JSON.parse(result).id_user,   
                    }); 
                });

              
              }catch(error){
                  alert(error)
              }
              let id_offre=offre.id_offre
            let sujet_reclamation=this.state.sujet_reclamation;
            let isValid=this.state.isValid;
            let idUser=this.state.idUser;
            console.log(this.state);
        
        
            fetch((new Credentials()).server+"?",
            {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
                body: "context=reclamations&action=insert&sujet_reclamation="+sujet_reclamation+"&is_valid="+isValid+"&id_client="+idUser+"&id_offre="+id_offre,
            }
        )
        .then(response => response.json())
        .then(data => {
            //this.props.navigation.navigate('PageOScreen')
        })
        .catch(err => console.log(err))
        }
        /*          <DataTable>
            <DataTable.Header>
              <DataTable.Title numeric>Nombre des pieces</DataTable.Title>
              <DataTable.Title numeric>Surface</DataTable.Title>
              <DataTable.Title >Disponiblite</DataTable.Title>
              <DataTable.Title numeric>meuble</DataTable.Title>
          
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell numeric></DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
              <DataTable.Cell >6.0</DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
            </DataTable.Row>
    
            <DataTable.Row>
            <DataTable.Cell numeric></DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
              <DataTable.Cell >6.0</DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
            </DataTable.Row>
    
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => { console.log(page); }}
              label="1-2 of 6"
            />
          </DataTable> */
        render(){
           
            return (
              <ScrollView style={{backgroundColor:'#e5dfdf'}}>
                <View style={styles.container}>
                  <Card style={{paddingTop:20,paddingBottom:40}}>
                       <Card.Content>
                    
               <View style={styles.field}>
                    <Text style={styles.label}>Sujet de reclamation</Text>
                    <TextInput
                        style={styles.AreaText}
                        placeholder=""
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={sujet_reclamation => this.setState({sujet_reclamation})}
                        />
                  
                </View>
                </Card.Content>
                <Card.Actions>
                <View style={{paddingTop:20, width:'100%',padding:5}}>
                    <TouchableOpacity style={styles.button}  onPress={this.doRegister}>
                        <Text style={{ color:'#fff'}}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
                    </Card.Actions>
                    </Card>
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
        borderColor: '#bdc3c7',
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
      fontSize:20,
      margin:5,
      color: "#512b58",
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
        marginBottom: 10  
    },
    AreaText: {  
        textAlign: 'center',  

        borderRadius: 10,  
        borderWidth: 2,  
        borderColor: '#79bac1',  
     
    }
})