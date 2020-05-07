import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Picker, AsyncStorage} from 'react-native'
import Credentials from './credentials';
import {Card,Button,TextInput} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';

export default class QuartierScreen extends React.Component{
    constructor(props){
        super(props),
        this.state={
            ville:null,
            villes:[],
            nom_quartier:'',
            num_rue:'',
            id_ville:0,
            lastQuartier:[],
        }

        this.saveQuartier=this.saveQuartier.bind(this);
        this. getLastQuartier=this. getLastQuartier.bind(this);
    }

    componentDidMount(){
        fetch((new Credentials()).server+"?context=Villes&action=findAll")
        .then(res => res.json())
        .then(res => {
            if(res.itemValue !== null){
            //alert("ok")
            //AsyncStorage.setItem('user', JSON.stringify(res));
            this.setState({
                villes: res,
            })
            //alert(this.state.villes)
            }else{
                alert("ko")
            }
        })
        
    }

    getLastQuartier(){
        fetch((new Credentials()).server+"?context=myPreferred&action=findLast")
        .then(res => res.json())
        .then(res => {
            //alert(JSON.stringify(res));
            this.setState({lastQuartier: res})
            AsyncStorage.setItem('id_quart', JSON.stringify(this.state.lastQuartier[0].max));
            //alert(this.state.lastQuartier[0].max);
            
        });
    }
    
    saveQuartier(){
        let nom_q=this.state.nom_quartier;
        let num_r=this.state.num_rue;
        let id_v=this.state.id_ville;
        fetch((new Credentials()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=quartiers&action=insert&nom_quartier="+nom_q+"&num_rue_quartier="+num_r+"&id_ville="+id_v+"",
        }
    )
    .then(response => response.text())
    .then(data => {
        this.getLastQuartier();
        //alert(this.state.lastQuartier[0].max);
        this.props.navigation.navigate('Espace locateur', {screen:'Logement'});
    })
    .catch(err => console.log(err))   
    }

    render(){
           
        return(
                <ScrollView>
                <View style={styles.container}>
                    <Card style={{paddingTop:20,paddingBottom:40}}>
                       <Card.Content>
                       
         
                        <View style={styles.field}>
                            <TextInput label='Quartier' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                            autoCapitalize="none" value={this.state.nom_quartier}  onChangeText={(nom_quartier) => this.setState({nom_quartier})}  />
                        </View>
                        <View style={styles.field}>
                            <TextInput label='Rue' mode='flat' style={{backgroundColor:'#fff', color:'#000'}}
                            autoCapitalize="none" value={this.state.num_rue}  onChangeText={(num_rue) => this.setState({num_rue})}  />
                        </View>
                        <View style={{paddingTop:30}}>
                        <Picker
                        selectedValue={this.state.ville}
                        style={styles.input}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ville: itemValue, id_ville: itemValue})
                        }
                        >
                       {this.state.villes.map( (v, id) => {
                            return (<Picker.Item key={id} value={v.id_ville}   label={v.nom_ville} />)
                            })}
                        
                        </Picker>
                        </View>
                        <Card.Actions>
                            <View style={{paddingTop:30, width:'100%'}}>
                            <TouchableOpacity style={styles.button} onPress={this.saveQuartier}>
                                <Text style={{ color:'#fff'}}>Suivant</Text>
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
        paddingTop:10,
        paddingBottom:10,
       
    },
    button: {
        backgroundColor:'#357376',
        width:'100%',
        padding:9,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5

    },
    field:{
      paddingTop:20,
    },
    label:{

        fontSize:15,
        margin:5,
    }
})