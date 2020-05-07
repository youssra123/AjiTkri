import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Picker, AsyncStorage} from 'react-native'
import Credential from './credentials';
import {Card,TextInput} from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';


export default class ModifierLogement extends React.Component{
    constructor(props){
      super(props);
      this.state={
        ville:null,
        villes:[],
        nom_quartier:' ',
        num_rue:'',
        id_ville:0,
        lastQuartier:[],
        logement: null,
    }
    this.editQuartier=this.editQuartier.bind(this);
    }

    refresh(){
        this.props.route.params.refresh();
      }

    componentDidMount(){
        const {log} = this.props.route.params;
        //alert(log.nom_ville);
       
        fetch((new Credential()).server+"?context=Villes&action=findAll")
        .then(res => res.json())
        .then(res => {
            if(res.itemValue !== null){
            //alert("ok")
            //AsyncStorage.setItem('user', JSON.stringify(res));
            this.setState({
                villes: res,
                ville:log.nom_ville,
                nom_quartier:log.nom_quartier,
                num_rue:log.num_rue_quartier,
                id_ville:log.id_ville,
            })
            //alert(this.state.ville)
            }else{
                alert("ko")
            }
        });  
    }

    editQuartier(id,logement){
        let nom_q=this.state.nom_quartier;
        let num_r=this.state.num_rue;
        let id_v=this.state.id_ville;
        fetch((new Credential()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=quartiers&action=update&id_quartier="+id+"&nom_quartier="+nom_q+"&num_rue_quartier="+num_r+"&id_ville="+id_v,
        }
    )
    .then(response => response.json())
    .then(data => {
        //alert(this.state.lastQuartier[0].max);
        this.props.navigation.navigate('Information Logement',{log:logement, refresh:this.refresh.bind(this)});
    })
    .catch(err => console.log(err))   
    }
  

    render(){
        const {log} = this.props.route.params;

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
                            <TouchableOpacity style={styles.button} onPress={this.editQuartier}>
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
    
   
    label:{

        fontSize:15,
        margin:5,
    }
})