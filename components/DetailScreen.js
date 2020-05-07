import React from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Credentials from './credentials'

export default class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data: null,
            lastDetails:[],
            titre_detail : '',
            sous_titre_detail:'',
            description_detail:'',

        

        }
        this.doRegister=this.doRegister.bind(this);
        this. getLastDetails=this. getLastDetails.bind(this);
    }
    getLastDetails(){
        fetch((new Credentials()).server+"?context=myPreferred&action=findLastDetails")
        .then(res => res.json())
        .then(res => {
            //alert(JSON.stringify(res));
            this.setState({lastDetails: res})
         //  AsyncStorage.setItem('id_details', JSON.stringify(this.state.lastDetails[0].max));
           //alert(JSON.stringify(this.state.lastDetails[0].max));
            
        });
    }
    doRegister(id){
        let titre_detail=this.state.titre_detail;
        let sous_titre_detail=this.state.sous_titre_detail;
        let description_detail=this.state.description_detail;
       this.getLastDetails();
  
        fetch((new Credentials()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
         body: "context=details&action=insert&titre_detail="+titre_detail+"&sous_titre_detail="+sous_titre_detail+"&description_detail="+description_detail,
         //  body: "context=offres&action=insert&date_offre="+date+"&prix_offre="+prix+"&is_valid="+isValid+"&id_detail="+idDetail,
        }
    )
    .then(response => response.json())
       // console.log("response: "+response.json());
    .then(data => {
        console.log("Offre max: "+JSON.stringify(this.state.lastDetails[0].max));
        this.props.navigation.navigate('Offres',{offre:JSON.stringify(this.state.lastDetails[0].max+1),id_log:id});
       
    })
    .catch(err => console.log(err))
    }
    render() {
        const {id_logement}=this.props.route.params
        return (
            <ScrollView>
            <View style={styles.form}>
                <View style={styles.field}>
                <Text style={styles.label1}>Ajouter Offre</Text>
                <Text>{"\n"}{"\n"}</Text>
                <Text style={styles.label}>Titre detail</Text>
                    <TextInput style={styles.TextInputStyle} onChangeText={(titre_detail) => this.setState({titre_detail})}  />
                </View>
                <View style={styles.field}>

                    <Text style={styles.label}>Sous titre detail</Text>
                    <TextInput  style={styles.TextInputStyle} onChangeText={sous_titre_detail => this.setState({sous_titre_detail})}  />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Description detail</Text>
                    <TextInput
                        style={styles.AreaText}
                        placeholder=""
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={description_detail => this.setState({description_detail})}
                        />
                  
                </View>
               
               
                <TouchableOpacity>
                    <Text style={styles.button} onPress={()=>this.doRegister(id_logement)}>Suivant</Text>
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