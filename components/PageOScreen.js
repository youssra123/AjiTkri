import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image,Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Ionicons } from '@expo/vector-icons';
import { DataTable,Searchba,Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import { Subtitle } from 'native-base';
import { SearchBar } from 'react-native-elements';
import Credentials from './credentials'
export default class PageOScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        data: [],
        date:'',
        dataSource: [],
        isLoading: true,
        search: ''
    }   
    this.arrayholder = [];
    this.delete=this.delete.bind(this); 
    this.update=this.update.bind(this); 
      }
      search = text => {
        console.log(text);
      };
      clear = () => {
        this.search.clear();
      };
    
      SearchFilterFunction(text) {
        //passing the inserted text in textinput
      //  this.componentDidMount();
      const newData = this.arrayholder.filter(function(o) {
          //applying filter for the inserted text in search bar
          const itemData = o.titre_detail ? o.titre_detail.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
    
        this.setState({
          //setting the filtered newData on datasource
          //After setting the data it will automatically re-render the view
          dataSource: newData,
          search: text,
        });
      }
      update(of){
        console.log("je suis dans update");
        console.log("offre="+JSON.stringify(of));
        this.props.navigation.navigate('UpdateOffre',{offre:of});
      }
      componentDidMount() {
      
        fetch((new Credentials()).server+"?context=myPreferred&action=offresAll")
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
       
      }
      delete(offre){
     
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
                        { text: 'OK', onPress: () => {  console.log("offre.id_offre="+offre.id_offre);
                        fetch((new Credentials()).server+"?",
                                {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json, text/plain, */*',
                                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                                },
                                    body: "context=offres&action=delete&id_offre="+offre.id_offre,
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
       if (this.state.isLoading) {
      // Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          
        </View>
      );
    }
     
    
              return [
      
                <SearchBar
                round
                style={{backgroundColor: '#2a7886',color: '#2a7886',borderColor:'#f1f3f4'}}
                searchIcon={{ size: 24 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                placeholder="Type Here..."
                value={this.state.search}
              />,
           
           this.state.dataSource.map((o, i) => {
           
            
              return (
        
             <Card ItemSeparatorComponent={this.ListViewItemSeparator}>
                
                
             <Card.Title /*title="Card Title" subtitle="Card Subtitle"*/  />
             <Card.Content>
         
             <View key={i} style={styles.user}>
            
             <Text style={{display: "inline-block",textAlign: 'left'}}><Image
          source={{uri: 'https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png',}}
          //borderRadius style will help us make the Round Shape Image
          style={{display: "inline-block", width: 40, height: 40, borderRadius: 40 / 2 }}
        />{o.nom_user} {o.prenom_user}</Text>
         <Text style={{textAlign: 'center'}}>Prix:{o.prix_offre} DH</Text>
          <Text style={{textAlign: 'right'}}>Date: {o.date_offre}</Text>
               <Title style={styles.sousTitre}>{o.titre_detail} </Title>
               <Title style={styles.sousTitre}>{o.sous_titre_detail}
               
               </Title>
              
               <Paragraph>{o.description_detail}</Paragraph>
               </View>
              
             </Card.Content>
             <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
             <Card.Actions>
           
            
               <Button  onPress={()=>{this.delete(o)}}><Image source={require('../assets/img.png')} style={{ width: 20, height: 20 }} />Delete</Button>
               <Text>{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}{"\t"}</Text>
               <Button style={{   alignItems: 'left', }}  onPress={()=>{this.update(o)}}><Image source={require('../assets/img.png')} style={{ width: 20, height: 20 }} />Update</Button>
             
             </Card.Actions>
           </Card>
           );
          })
        
              ]
       
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
        backgroundColor: '#1abc9c',
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
        fontSize:15,
        margin:5,
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
        borderColor: '#009688',  
        marginBottom: 10  
    },
    sousTitre: { 
      textAlign: 'center',  
      height: 40,  
    
      marginBottom: 10  
  } ,
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0dcdc',
  },
  text: {
    marginTop: 30,
    fontSize: 40,
    color: '#0250a3',
    fontWeight: 'bold',
  }, 
})