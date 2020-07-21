import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import {Card,TextInput} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import Credentials from './credentials'
import { DataTable,Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
export default class AfficheReclamations extends React.Component{
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
                data: [],
                date:'',
                dataSource: [],
                isLoading: true,
                search: ''
            }  
            this.delete=this.delete.bind(this) 
            this.detail=this.detail.bind(this) 
            this.arrayholder = [];
            
          }
        

          componentDidMount() {
      
            fetch((new Credentials()).server+"?context=myPreferred&action=reclamationsAll")
            .then(res => res.json())
            .then(res => {
              //  this.setState({ data: res, isLoading: false, })
               // console.log("data="+JSON.parse(this.state.data));
               // console.log("data="+JSON.parse(res));
                this.setState(
                  {
                    isLoading: false,
                    dataSource: res,
                  },
                  function() {
                    this.arrayholder = res;
                  }
                );
            })
            .catch(err => {
                  
            })
            console.log("data offre="+this.state.dataSource);
          }
          detail(o){
            this.props.navigation.navigate('AfficheDOffre',{of:o});
          }
          delete(rec){
         
           Alert.alert(
                          'Alert Title',
                          'My Alert Msg',
                          [
                            { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            { text: 'OK', onPress: () => {  console.log("rec.id_reclamation="+rec.id_reclamation);
                            fetch((new Credentials()).server+"?",
                                    {
                                    method: "POST",
                                    headers: {
                                        'Accept': 'application/json, text/plain, */*',
                                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    },
                                        body: "context=reclamations&action=delete&id_reclamation="+rec.id_reclamation,
                                    }
                                )
                                .then(data => response.json())
                                .then(data => {
                                    this.props.navigation.navigate('PageOScreen');
                                })
                                .catch(err => console.log(err))} },
                          ],
                          { cancelable: false }
                        );
                        this.props.navigation.navigate('PageOScreen');
        }
 
        render(){
            return (
                <View style={styles.container}>
                  <DataTable>
                  <DataTable.Header>
                  <DataTable.Title >Utilisateur</DataTable.Title>
                          <DataTable.Title >la reclamation</DataTable.Title>
                          <DataTable.Title >quel offre?</DataTable.Title>
                          <DataTable.Title >Delete</DataTable.Title>
                          </DataTable.Header>
                    {
                         this.state.dataSource.map((rec, i) => {
                  
                     return (
                        <DataTable.Row>
                          <DataTable.Cell >{rec.nom_user} {rec.prenom_user}</DataTable.Cell>
                     <DataTable.Cell >{rec.sujet_reclamation}</DataTable.Cell>
                          <DataTable.Cell >  <TouchableOpacity  onPress={()=>{this.detail(rec)}}/>
            <View style={{justifyContent:'center', padding:5}} >
              <Ionicons  name='md-text' size={20} color='#357376'></Ionicons>
              </View></DataTable.Cell>
                          <DataTable.Cell>  
          <TouchableOpacity  onPress={()=>{this.delete(rec)}}/>
            <View style={{justifyContent:'center', padding:5}} >
              <Ionicons  name='md-trash' size={20} color='#ff4757'></Ionicons>
              </View>  </DataTable.Cell>
                        </DataTable.Row>
                    )} 
                   )
                    }
                      <DataTable.Pagination
                          page={1}
                          numberOfPages={3}
                          onPageChange={(page) => { console.log(page); }}
                          label="1-2 of 6"
                        />
                  </DataTable>
                </View>
              );
            }
 
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#357376',
    width:'100%',
    padding:9,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5
},
  field:{
    paddingTop:10,
    paddingBottom:10,
   
},
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
    container:{
      padding:10,
      paddingBottom:20,
      backgroundColor:'#e5dfdf'
  },
    
    field:{
      paddingTop:20,
    },
    
    label:{
      fontSize:18,
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
      borderWidth: 1,  
      borderColor: '#79bac1',  
  },
  AreaText: {  
      textAlign: 'center',  

      borderRadius: 10,  
      borderWidth: 2,  
      borderColor: '#79bac1',  
   
  }  
})