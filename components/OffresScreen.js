import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { DataTable,Searchbar} from 'react-native-paper';

export default class OffreScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        data: null,
        date:'',
        prix : '',
        isValid: '1',
        idDetail:'',
        idLogement: '1',
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
          idDetail: this.props.navigation.state.params.offre,
        });
        fetch("http://localhost:8081/atjitkri/apiprovider/?context=offres&action=findAll")
        .then(res => res.json())
        .then(res => {
            if(res.id_user != null){
                this.props.navigation.navigate('Offre')
            }else{
                alert("Email ou mot de passe incorrect")
            }
        })
        .catch(err => {
                alert("Could not connect to server")
        })
        console.log("ici=");
       // console.log("id="+this.props.navigation.state.params.offre);
      }
      doRegister(){
        // res=await AsyncStorage.getItem('id_details');
        let date= this.state.date;
        let prix=this.state.prix;
        let isValid=this.state.isValid;
        let idDetail=this.state.idDetail;
        let idLogement=this.state.idLogement;
        let idUser=this.state.idUser;
        console.log(this.state);
        fetch("http://localhost:8081/atjitkri/apiprovider/?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=offres&action=insert&date_offre="+date+"&prix_offre="+prix+"&is_valid="+isValid+"&id_detail="+idDetail+"&id_user="+idUser+"&id_logement="+idLogement,
        }
    )
    .then(response => response.json())
    .then(data => {
        this.props.navigation.navigate('PageOScreen')
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
            <View style={styles.form}>
                <View style={styles.field}>
                <Text style={styles.label1}>Ajouter Offre</Text>
                <Text>{"\n"}{"\n"}</Text>
                <DatePicker
              style={{width: 200}}
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
           <View style={styles.container}>
                <Text style={styles.label}>Prix d'offre</Text>
                    <TextInput style={styles.TextInputStyle} underlineColorAndroid='transparent' onChangeText={(prix) => this.setState({prix})}  />
                </View>
        
       
                <TouchableOpacity>
                    <Text style={styles.button} onPress={this.doRegister}>Enregister</Text>
                </TouchableOpacity>
            </View>
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
    container: {  
        flex: 1,  
        justifyContent: 'center',  
    },   
    label:{
      fontFamily: 'Cochin',
      fontSize:20,
      margin:5,
      color: "#512b58",
  },
   label1:{
      fontFamily: 'Cochin',
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
      fontFamily: 'Cochin',
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