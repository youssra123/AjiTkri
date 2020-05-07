import React from 'react';
import {StyleSheet, View, Text,  TouchableOpacity,AsyncStorage,Picker} from 'react-native'
import { RadioButton} from 'react-native-paper';
import { Left, Right} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Credential from './credentials';
import {Card,TextInput} from 'react-native-paper'

export default class LogementScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            checked: 'first',
            nbr_pieces: 0,
            surface:0,
            chosenDate: new Date(),
            id_q:0,
            types:[],
            etats:[],
            type:null,
            etat:null,
            id_type:0,
            id_etat:0,
            client:null,
        }
        this.setDate = this.setDate.bind(this);
        this.displayData=this.displayData.bind(this);
        this.AjouterLogement=this.AjouterLogement.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
      

      displayData =async()=>{
        try{
          let res=await AsyncStorage.getItem('id_quart');
          let user=await AsyncStorage.getItem('user');
          let parsed=JSON.parse(user);
          //alert("q"+q);
          //let parsed=JSON.parse(q);
          this.setState({
              id_q:JSON.parse(res),
              client:parsed,
          });
          this.AjouterLogement();
          //alert(this.state.id_q);

        }catch(error){
            alert(error)
        }
         }
         

         componentDidMount(){
            fetch((new Credential()).server+"?context=types&action=findAll")
            .then(res => res.json())
            .then(res => {
                if(res.itemValue !== null){
                //alert("ok")
                //AsyncStorage.setItem('user', JSON.stringify(res));
                this.setState({
                    types: res,
                })
                //alert(this.state.villes)
                }else{
                    alert("ko")
                }
            })

            fetch((new Credential()).server+"?context=etats&action=findAll")
            .then(res => res.json())
            .then(res => {
                if(res.itemValue !== null){
                //alert("ok")
                //AsyncStorage.setItem('user', JSON.stringify(res));
                this.setState({
                    etats: res,
                })
                //alert(this.state.villes)
                }else{
                    alert("ko")
                }
            })
         }
    
      
    AjouterLogement(){
        let nbr_p=this.state.nbr_pieces;
        let surface=this.state.surface;
        let meuble=this.state.checked;
        let m=0;
        if(meuble== 'first'){
            m=1;
        }else{
            m=0;
        }

        fetch((new Credential()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=logements&action=insert&nbr_pieces_logement="+nbr_p+"&surface_logement="+surface+"&disponibilite_logement=1&meuble="+m+"&is_valid=1&id_type="+this.state.id_type+
            "&id_quartier="+this.state.id_q+"&id_etat="+this.state.id_etat+"&id_client="+this.state.client.id_user,
        }
        )
        .then(response => response.text())
        .then(data => {
           // this.props.navigation.navigate('Offre')
           this.props.navigation.navigate('Logements');

        })
        .catch(err => console.log(err))
      }
    render(){
        const { checked } = this.state;
        return(
            <ScrollView>
             <View style={styles.container}>
                    <Card style={{paddingTop:20,paddingBottom:40}}>
                       <Card.Content>
                       <View style={styles.field}>
                            <TextInput label='Nombre de pièces' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                            autoCapitalize="none" keyboardType={'numeric'} value={this.state.nbr_pieces}  onChangeText={(nbr_pieces) => this.setState({nbr_pieces})}  />
                        </View>
                        <View style={styles.field}>
                            <TextInput label='Surface' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                            autoCapitalize="none" keyboardType={'numeric'} value={this.state.surface}  onChangeText={(surface) => this.setState({surface})}  />
                        </View>

                        <View style={styles.radio}>
                          <Left>
                            <Text>Meublé</Text>
                          </Left>
                       <Right>
                        <RadioButton
                                color='#357376'
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'first' }); }}
                                />
                        </Right>
                        </View>

                <View style={styles.radio}>
                <Left>
                        <Text>Sans meuble</Text>
                    </Left>
                    <Right>
                        <RadioButton
                                color='#357376'
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'second' }); }}
                                />
                        </Right>
                        </View>
                        <View style={{paddingTop:30,paddingRight:8}}>
                            <Picker
                                    selectedValue={this.state.type}
                                    style={styles.input}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({type: itemValue, id_type:itemValue})
                                    }
                                    >
                                {this.state.types.map( (t, id) => {
                        return (<Picker.Item key={id} value={t.id_type}   label={t.designation_type} />)
                        })}
                                    
                                    </Picker>
                            </View>
                            <View style={{paddingTop:20,paddingRight:8}}>
                            <Picker
                                    selectedValue={this.state.etat}
                                    style={styles.input}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({etat:itemValue,id_etat: itemValue})
                                    }
                                    >
                                {this.state.etats.map( (e, id) => {
                        return (<Picker.Item key={id} value={e.id_etat}   label={e.etat} />)
                        })}
                                    
                        </Picker>
                        </View>
                        <Card.Actions>
                        <View style={{paddingTop:30, width:'100%'}}>
                            <TouchableOpacity style={styles.button} onPress={this.saveQuartier}>
                                <Text style={{color:'#fff'}} onPress={this.displayData}>Valider</Text>
                            </TouchableOpacity>
                            </View>
                        </Card.Actions>
                       </Card.Content>
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
        backgroundColor:'#e5dfdf'
    },
    field:{
        paddingTop:10,
        paddingBottom:10,
       
    },
    radio:{
        paddingTop:20,
        flexDirection:'row',
        paddingLeft:10
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
    button: {
        backgroundColor:'#357376',
        width:'100%',
        padding:9,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5

    },
  
    label:{

        fontSize:15,
        margin:5,
    }
})
