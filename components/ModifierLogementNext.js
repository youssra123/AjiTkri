import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Picker, ScrollView} from 'react-native'
import Credential from './credentials';
import { RadioButton} from 'react-native-paper';
import { Content, Left, Right,ListItem  } from 'native-base';
import {Card,TextInput} from 'react-native-paper'


export default class ModifierLogementNext extends React.Component{
    constructor(props){
      super(props);
      this.state={
        checked: 'first',
        nbr_pieces: 0,
        surface:0,
        id_q:0,
        types:[],
        etats:[],
        type:null,
        etat:null,
        id_type:0,
        id_etat:0,
        client:null,
        fonction:null,
    }
    this.modifierLogement=this.modifierLogement.bind(this);
    
    }

    
    componentDidMount(){
        const {log} = this.props.route.params;
           let m;
           if(log.meuble ==1){
            m='first';
            }else{
                m='second';
            }
        fetch((new Credential()).server+"?context=types&action=findAll")
        .then(res => res.json())
        .then(res => {
            if(res.itemValue !== null){
            //alert("ok")
            //AsyncStorage.setItem('user', JSON.stringify(res));
            this.setState({
                types: res,
                type:log.designation_type,
                id_type:log.id_type,
            })
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
                etat:log.etat,
                id_etat:log.id_etat,
                nbr_pieces:JSON.stringify(log.nbr_pieces_logement),
                surface:JSON.stringify(log.surface_logement),
                checked:m,

            })
            //alert(this.state.villes)
            }else{
                alert("ko")
            }
            
        })
     }
    
    modifierLogement(){
        const {log} = this.props.route.params;
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
            body: "context=logements&action=update&id_logement="+log.id_logement+"&nbr_pieces_logement="+nbr_p+"&surface_logement="+surface+"&disponibilite_logement=1&meuble="+m+"&is_valid=0&id_type="+this.state.id_type+
            "&id_etat="+this.state.id_etat,
        }
        )
        .then(response => response.text())
        .then(data => {
            this.props.route.params.refresh();
           this.props.navigation.navigate('Logements');

        })
        .catch(err => console.log(err))

    }

    render(){
        const { checked } = this.state;
        const {log} = this.props.route.params;
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
                            <Picker.Item  key={log.id_type} value={log.id_type}   label={log.designation_type} />
                        {this.state.types.map( (t) => {
                return (<Picker.Item key={t.id_type} value={t.id_type}   label={t.designation_type} />)
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
                        <Picker.Item  key= {log.id_etat} value={log.id_etat}   label={log.etat} />
                        {this.state.etats.map( (e) => {
                return (<Picker.Item key={e.id_etat} value={e.id_etat}   label={e.etat} />)
                })}
                            
                            </Picker>
                    </View>
                    <Card.Actions>
                        <View style={{paddingTop:30, width:'100%'}}>
                            <TouchableOpacity style={styles.button} onPress={this.modifierLogement}>
                                <Text style={{color:'#fff'}} >Valider</Text>
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
    button: {
        backgroundColor:'#357376',
        width:'100%',
        padding:9,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5

    },
    form:{
        padding:20,
    },
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

   
   
})
