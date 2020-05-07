import React from 'react';
import { View, Text, StyleSheet,Image,Alert,AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Ionicons } from '@expo/vector-icons';
import { DataTable,Searchba,Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import { Subtitle } from 'native-base';
import { SearchBar } from 'react-native-elements';
import Credentials from './credentials'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default class OffreScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        data: [],
        date:'',
        dataSource: [],
        isLoading: true,
        search: '',
        user:null,
        test:''
    }   
    this.arrayholder = [];
   
    this.detail=this.detail.bind(this); 

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
     
      async componentDidMount() {
        try{
            let user=await AsyncStorage.getItem('user');
            let parsed=JSON.parse(user);
            //alert("q"+q);
            //let parsed=JSON.parse(q);
            this.setState({
                user:parsed,
            });
            //alert(this.state.user.id_user)
          
          }catch(error){
              alert(error)
          }
      
        fetch((new Credentials()).server+"?context=myPreferred&action=findOffres&id_user="+this.state.user.id_user)
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
        this.props.navigation.navigate('DétailsOffreLocateur',{of:o});
      }


    
    render(){
       if (this.state.isLoading) {
      // Loading View while data is loading
      return (
        <ScrollView >
        <View style={{ flex: 1, paddingTop: 10 }}>
          
        </View>
        </ScrollView>
      );
    }

    const res =(
        this.state.dataSource.map((o, i) => {      
            (o.is_valid)?
            this.state.test=(
             <View style={{flexDirection:'row'}}>
             <Ionicons name='md-alert' size={20} color='#ff4757'>
               </Ionicons>
           <Text style={styles.alert}>En attente d'approbation</Text>
           </View>

            ): this.state.test=(
                <View>
                </View>
            )
            
            
            return (
             
            <View style={{backgroundColor:'#e5dfdf',padding:6,flex: 1}}>
              <TouchableOpacity  onPress={()=>{this.detail(o)}}>
           <Card ItemSeparatorComponent={this.ListViewItemSeparator}>
              
           <Card.Title /*title="Card Title" subtitle="Card Subtitle"*/  />
           <Card.Content>
          {this.state.test}
           <View style={styles.styleTitre}>
            <Text style={styles.sousTitre}>{o.titre_detail} </Text>
            <Text style={{paddingTop:10,fontSize:16}}>Prix: {o.prix_offre} DH</Text>
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
   sousTitre: { 
    fontSize: 16, 
    fontFamily:'serif'
 } ,
  alert:{
    paddingLeft:15,
    paddingBottom:15,
    fontSize:15,
    color:'#ff4757',
    fontFamily:'sans-serif-thin'
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