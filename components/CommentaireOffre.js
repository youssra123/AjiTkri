import React from 'react'
import {View,Text,ActivityIndicator,AsyncStorage,Image,StyleSheet,TextInput} from 'react-native'
import { Button, Card } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Credentials from './credentials';

export default class CommentaireOffre extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:null,
            comments:[],
            res:'',
            show: true,
            commentaire:'',
            tab:null,
           
        }
        this.addComment=this.addComment.bind(this)
    }

    async componentDidMount(){
        const {offre}=this.props.route.params
        try{
            let user=await AsyncStorage.getItem('user');
            let parsed=JSON.parse(user);
            this.setState({
                user:parsed,
            });  
          }catch(error){
              alert(error)
          }

          let id_offre=offre.id_offre
          let is_valid=0
          fetch((new Credentials()).server+"?context=myPreferred&action=AllComments&id_offre="+id_offre+"&is_valid="+is_valid)
          .then(res => res.json())
          .then(res => {
             this.setState({
                 comments:res,
                 show: false,
             })
  
          })
          
     
      
    }

    addComment(){
        const {offre}=this.props.route.params
        let commentaire=this.state.commentaire
        let id=this.state.user.id_user
        let id_offre=offre.id_offre
        fetch((new Credentials()).server+"?",
        {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
            body: "context=commentaires&action=insert&contenu_commentaire="+commentaire+"&is_valid=1&id_offre="+id_offre+"&id_user="+id,
        }
        )
        .then(response => response.json())
        .then(response => {
           let list={
               content:commentaire,
               user_nom:this.state.user.nom_user,
               user_prenom:this.state.user.prenom_user
           }
         this.setState({
             tab:list,
             commentaire:''  
         })
       
        })
        .catch(err => console.log(err))

        }


    render(){
        let data=' '
       if(this.state.tab != null){
         data=
          (
            <View style={{flexDirection:'row',margin:10}}>
                <View style={{padding:8}}>
                <Image
                style={{ borderRadius:50, width:40,height:40 }}
                source={require('../assets/img.png')}
                />
                </View>
                <View style={{padding:15,backgroundColor:'#eee',borderRadius:10}}>
                <Text style={styles.user}>
                    {this.state.tab.user_nom} {this.state.tab.user_prenom}
                </Text>
                <Text style={styles.comment}>
                    {this.state.tab.content}
            </Text>
            </View>
          </View>

          )
       }else{
           data=(
               <View>

               </View>
           )
       }
        if(!this.state.show){ 
          (this.state.comments.length != 0)?
          this.state.res=(this.state.comments.map((com, key)=>{
              return(
                
                      <View style={{flexDirection:'row',margin:10}}>
                        <View style={{padding:8}}>
                        <Image
                        style={{ borderRadius:50, width:40,height:40 }}
                         source={require('../assets/img.png')}
                        />
                        </View>
                     <View style={{padding:15,backgroundColor:'#eee',borderRadius:10}}>
                      <Text style={styles.user}>
                          {com.nom_user} {com.prenom_user}
                      </Text>
                      <Text style={styles.comment}>
                          {com.contenu_commentaire}
                      </Text>
                      </View>
                      </View>
                

              )
          })
  
          ): this.state.res=(
              <View>
                  
              </View>
          )
        }else{
            this.state.res=(
                <View></View>
            )
        }
        return(
            <ScrollView style={{backgroundColor:"#fff"}}>
            <View style={styles.container}>
                <View >
                {this.state.res}
                </View>
                <View>
                   {data}
                </View>
                <View style={{flexDirection:'row',margin:10}}>
                          <View style={{padding:8}}>
                        <Image
                        style={{ borderRadius:50, width:40,height:40 }}
                         source={require('../assets/img.png')}
                        />
                        </View>
                <View>
                <TextInput
                        style={styles.AreaText}
                        placeholder="Votre commentaire"
                        multiline={true}
                        onChangeText={commentaire=> this.setState({commentaire})}
                        value={this.state.commentaire}
                />
                </View>
               
                <View style={styles.b}>
                    <TouchableOpacity style={styles.btn} onPress={this.addComment}>
                        <Text style={{color:'#fff'}}>+</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    b:{
    paddingLeft:10,
    },
    btn:{
        backgroundColor:'#46185f',
        borderRadius:6,
        width:40,
        height:44,
        justifyContent:'center',
        alignItems:'center'

    },
    AreaText: {  
        padding:10,
        borderRadius: 10,  
        borderWidth: 1,  
        borderColor: '#eee',
     
    },
    container:{
        flex:1,
        paddingTop:20,
        paddingBottom:20,
           
       },
    comment:{
        fontSize:14,
        fontFamily: 'sans-serif-thin',
        
    },
    user:{
        paddingBottom:6,
        fontSize:15,
        fontFamily: 'sans-serif-medium',
    }

})