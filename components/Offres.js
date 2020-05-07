import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import {Card,TextInput} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';
import Credentials from './credentials'

export default class Offres extends React.Component{
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
            date:'',
            prix : '',
            isValid: '0',
            idDetail:'',
           
            idUser:'1'
        }   
            this.doRegister=this.doRegister.bind(this);
            
          }
          componentDidMount() {
            var that = this;
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            that.setState({
              //Setting the value of the date time
              date:
                 year+ '-' + month + '-' + date,
              idDetail: this.props.route.params.offre,
              
            });

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
            const {id_log}=this.props.route.params
            try{
                AsyncStorage.getItem('user', (err, result) => {
                    this.setState({
                        idUser:JSON.parse(result).id_user,   
                    }); 
                });

              
              }catch(error){
                  alert(error)
              }
            let date= this.state.date;
            let prix=this.state.prix;
            let isValid=this.state.isValid;
            let idDetail=this.state.idDetail;
            let idUser=this.state.idUser;
            console.log(this.state);
        
        
            fetch((new Credentials()).server+"?",
            {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
                body: "context=offres&action=insert&date_offre="+date+"&prix_offre="+prix+"&is_valid="+isValid+"&id_detail="+idDetail+"&id_user="+idUser+"&id_logement="+id_log,
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
                    <View  style={styles.field}>
                    <DatePicker
                  style={{width: '100%'}}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2016-05-01"
                  maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
               </View>
                  <View style={styles.field}>
                    <TextInput  label='Montant' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                     onChangeText={(prix) => this.setState({prix})}  
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