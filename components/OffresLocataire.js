import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image,Alert} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Ionicons } from '@expo/vector-icons';
import { DataTable,Searchba,Avatar,Button , Card, Title, Paragraph} from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import { Subtitle } from 'native-base';
import { SearchBar } from 'react-native-elements';
import Credentials from './credentials'
import { ScrollView } from 'react-native-gesture-handler';
export default class OffresLocataire extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        data: [],
        date:'',
        dataSource: [],
        isLoading: true,
        search: ''
    }  
    this.detail=this.detail.bind(this) 
    this.arrayholder = [];
   
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

      detail(o){
        this.props.navigation.navigate('DétailsOffre',{of:o});
      }
     

    
    render(){
       if (this.state.isLoading) {
      // Loading View while data is loading
      return (
        <ScrollView>
        <View style={{ flex: 1, paddingTop: 20 }}>
          
        </View>
        </ScrollView>
      );
    }

    const res =(
        this.state.dataSource.map((o, i) => {
           
            
            return (
            
                <View  style={{backgroundColor:'#e5dfdf',padding:6}}>
                  <TouchableOpacity onPress={()=> this.detail(o)}>
             <Card ItemSeparatorComponent={this.ListViewItemSeparator}>
              
           <Card.Title /*title="Card Title" subtitle="Card Subtitle"*/  />
           <Card.Content>
       
           <View key={i} style={styles.user}>
          <View style={{flexDirection:'row'}}>
          <Image
        source={{uri: 'https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png',}}
        //borderRadius style will help us make the Round Shape Image
        style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
      />
      <Text style={styles.text}>{o.nom_user} {o.prenom_user}</Text>
      </View>
      <View style={styles.styleTitre}>
      <Text style={styles.sousTitre}>{o.titre_detail} </Text>
      <Text style={{paddingTop:10,fontSize:16}}>Prix: {o.prix_offre} DH</Text>
      </View>
             </View>
            
           </Card.Content>
           <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
           <Card.Actions>
            
           </Card.Actions>  
         </Card>
         </TouchableOpacity>
         </View>
         
         
         );
        })
    )
     
    
              return [
                <SearchBar
                lightTheme
                round
                searchIcon={{ size: 24 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                placeholder="Type Here..."
                value={this.state.search}
                inputContainerStyle={{backgroundColor:'#357376'}}
                inputStyle={{backgroundColor:'#357376',color:'#fff', fontSize:16}}
                leftIconContainerStyle={{backgroundColor:'#357376'}}
                rightIconContainerStyle={{backgroundColor:'#357376'}}
                containerStyle={{backgroundColor:'#6ba8a9'}}
                placeholderTextColor='#fff'
                searchIcon={{color:'#fff'}}
                clearIcon={{color:'#fff'}}
              />,
           <ScrollView>
               {res}
           </ScrollView>
           
        
              ]
       
    }
}
const styles = StyleSheet.create({
  styleTitre:{
   paddingTop:10,
   paddingBottom:20
  },
  text:{
    padding:10,
    fontSize:15,
    fontFamily:'sans-serif-medium'
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
     fontSize: 16, 
     fontFamily:'serif'
  } ,
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0dcdc',
  },
 
})