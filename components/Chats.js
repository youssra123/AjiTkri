import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Credentials } from '../components/credentials'
import { format } from "date-fns";

export default class Chats extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      messages: [],
      msg: [],
      text:'',
      id_user1 : '129',//id utilisateurs courent
      id_user2 : '130',//id moul offre
      table:[],
    }
    this.getData=this.getData.bind(this);
  
}

  
  async componentDidMount() {
    try{
        //let user=await AsyncStorage.getItem('user');
      //  let parsed=JSON.parse(user);
        //alert("q"+q);
        //let parsed=JSON.parse(q);
        this.setState({
            //user:parsed,
        });
        //alert(this.state.user.id_user)
      
      }catch(error){
          alert(error)
      }
    fetch("http://localhost:8081/ajitkri/apiprovider/?context=myPreferred&action=messengersAll&id_user1="+this.state.id_user1+"&id_user2="+this.state.id_user2)
    .then(res => res.json())
    .then(res => {
      //  this.setState({ data: res, isLoading: false, })
       // console.log("data="+JSON.parse(this.state.data));
       // console.log("data="+JSON.parse(res));
  
       for (const key in res) {
        if (res.hasOwnProperty(key)) {
         // console.log("data="+JSON.stringify(res));
          const element = res[key];
          this.state.table.push({
            _id: element._id,
            text: element.text,
            createdAt: element.createdAt,
            sent: true,
            user: {
              _id: element._id2,
              name: element.name,
              avatar: element.avatar,
            },
          }
          );
         
        }
      }
     // console.log("data all table="+JSON.stringify(this.state.table));
     this.setState({
        messages: this.state.table,
      })
  
     // console.log("data all messenger="+JSON.stringify(this.state.messages));
      /* this.setState({
        data: res
      })*/
    })
    .catch(err => {
          
    })
   // this.getData();


  
  }
  getData(){
    
 

   
  }
  onSend(messages=[]) {

  
   
  this.state.data=this.state.messages;

    let id_user1=this.state.id_user1;
    let id_user2=this.state.id_user2;
    let date = format(new Date(), "yyyy-MM-dd hh:mm:ss");
    console.log("texto="+JSON.stringify(messages));
    console.log("date="+date);
    fetch("http://localhost:8081/ajitkri/apiprovider/?",
    {
    method: "POST",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
        body: "context=messenger&action=insert&text="+messages[0].text+"&id_user1="+id_user1+"&id_user2="+id_user2+"&date="+date,
    }
)
.then(response => response.json())
.then(response => {
  // this.props.navigation.navigate('Chats');
   //alert("done!!!!")
})
.catch(err => console.log(err))
/*this.setState({
  data: GiftedChat.append(this.state.msg, text),
})*/
this.setState(previousState => ({
    
  messages:  messages,

 //data:GiftedChat.append(data, text),
 
}))
  }

  render() {
    return (
      <GiftedChat inverted={false} messages={history}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.id_user1,
        }}
      />
    )
  }
}