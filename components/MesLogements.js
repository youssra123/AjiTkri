import * as React from 'react';
import {View, Text,StyleSheet,ScrollView,ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsLogement from './DetailsLogement';
import Credential from './credentials';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners'
import {Card} from 'react-native-paper'






export default class MesLogements extends React.Component{
    constructor(props){
        super(props);
        this.state={
          logements: [],
          inMemoryContacts: [],
           isLoading:true,
           search:'',
           res:'',
           test:'',
        }
        this.inMemoryContacts=[],


        this.getDetails=this.getDetails.bind(this);
        this.SearchFilterFunction=this.SearchFilterFunction.bind(this);

    }


   



getData=()=>{

    fetch((new Credential()).server+"?context=myPreferred&action=logementsAll")
        .then(res => res.json())
        .then(res => {
            if(res.itemValue !== null){
            //alert("ok")
            //AsyncStorage.setItem('user', JSON.stringify(res));
            this.setState({
                logements: res,
                isLoading: false,
            },
            function() {
                this.inMemoryContacts = res;
              }
              );
           
        }else{    
                alert("Aucun logements n'a été trouvé");
            }
        });
       

}
 

    componentDidMount(){

       this.getData();
       //this.listener = EventRegister.addEventListener('myCustomEvent',this.getData);
        this.props.navigation.setOptions({
            headerRight: () => (
                <View  style={{paddingRight:20}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:20}} onPress={() => 
                  this.props.navigation.navigate('Quartier')}  
                  >
                  <Text style={{color:'#fff', fontSize:18}}>+</Text>
                  </TouchableOpacity>
        
                 </View>
            ),
          });       
    }

    
    getDetails(log) {
         //alert(id_log);
         this.props.navigation.navigate('Details',{logement:log, refresh: this.getData.bind(this)});


    }
    

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.inMemoryContacts.filter(function(item) {
          //applying filter for the inserted text in search bar
          let itemData = (
            item.designation_type +
            ' ' +
            item.nom_ville+
            ' '+
            item.nom_quartier+
            ' '+
            item.num_rue_quartier
          ).toUpperCase();
         // const itemData = item.designation_type ? item.designation_type.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          logements: newData,
          search:text,
        });
      }

      /*
    
<View style={styles.container}>
           {this.state.logements.map((log, key)=>{
            return(
                <TouchableOpacity style={styles.button}  onPress={()=>{this.getDetails(log)}}>
                    <Text >{log.designation_type}</Text>
                <Text>{log.nom_quartier} {log.num_rue_quartier}, {log.nom_ville}</Text>
                </TouchableOpacity>
            )
        })

        }

        </View>
        */
 
       ListViewItemSeparator = () => {
        //Item sparator view
        return (
          <View
            style={{
              height: 0.3,
              width: '90%',
              backgroundColor: '#080808',
            }}
          />
        );
      };
    render(){
            if (this.state.isLoading) {
              //Loading View while data is loading
              return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <ActivityIndicator />
                </View>
              );
            }
            (this.state.logements.length != 0)?
            
                this.state.res=(this.state.logements.map((log, key)=>{
                  
                 (log.is_valid)?
                 this.state.test=(
                  <View style={{flexDirection:'row', paddingTop:18}}>
                  <Ionicons name='md-alert' size={20} color='#ff4757'>
                    </Ionicons>
                <Text style={styles.alert}>En attente d'approbation</Text>
                </View>

                 ): this.state.test=(
                     <View>
                     </View>
                 )
                  
                    return(
                        <TouchableOpacity style={styles.button} key={log.id_logement}  onPress={()=>{this.getDetails(log)}}>
                         <View style={{paddingTop:20,paddingBottom:20, justifyContent:'center'}}>
                          <View style={{flexDirection:'row' ,paddingBottom:20}}>
                            <Ionicons name='md-home' size={20} color='#357376'>
                            </Ionicons>
                          <Text style={styles.title}>{log.designation_type}</Text>
                          </View>
                          
                          <View style={{flexDirection:'row'}}>
                          <Ionicons name='md-pin' size={20} color='#357376'>
                            </Ionicons>
                        <Text style={styles.title}>{log.nom_quartier} {log.num_rue_quartier}, {log.nom_ville}</Text>
                        </View>
                          {this.state.test}
                        </View>
                        </TouchableOpacity>
                    )
                })
        
                ): this.state.res=(
                    <View>
                        <Text>Aucun logement n'a été crée</Text>
                    </View>
                )
            
        return(
            <ScrollView style={{backgroundColor:'#e5dfdf'}}>
            <View >
            <View style={{width:'100%'}}>
                
            <SearchBar
                placeholder="Tapez..."
                onChangeText={value =>{
                     this.SearchFilterFunction(value)
                     
                }}
                //value={this.state.search}
                inputStyle={{}}
                lightTheme
                round
                inputContainerStyle={{backgroundColor:'#357376'}}
                inputStyle={{backgroundColor:'#357376',color:'#fff', fontSize:16}}
                leftIconContainerStyle={{backgroundColor:'#357376'}}
                rightIconContainerStyle={{backgroundColor:'#357376'}}
                containerStyle={{backgroundColor:'#6ba8a9'}}
                placeholderTextColor='#fff'
                searchIcon={{color:'#fff'}}
                clearIcon={{color:'#fff'}}
                value={this.state.search}

            /> 
            </View>
        
          <View style={styles.container}>
           {this.state.res}
       
        </View>  
        </View>    
          
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
  alert:{
    paddingLeft:15,
    fontSize:15,
    color:'#ff4757',
    fontFamily:'sans-serif-thin'
  },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },

    title:{
      paddingLeft:15,
      fontSize:16
    },
    
    button: {
        backgroundColor: '#fff',
        padding:20,
        color: "#000",
        width:300,
        marginRight: 5,
        marginTop:20,
        borderRadius:3,
        justifyContent:"center",
        
    
    }
});
