import React from 'react'
import {  View, Text} from 'react-native'
import {Header, Left, Icon} from 'native-base'
import Authentication from './auth'




export default class HomeScreen extends React.Component {
	static navigationOptions={
		drawerIcon:({tintColor})=>(
             <Icon name="home" style={{fontSize:24, color: tintColor}} />
		),
	}

	componentDidMount(){
		if((new Authentication().isAuthenticated())){
			this.props.navigation.navigate('Identification',{screen:"Connexion"});
		}
	}
	
	render() {
		return(
			<View >
				<Header style={{justifyContent:'flex-start', backgroundColor:'#46185f'}}>
					<Left>
						<Icon  name="menu" style={{color:'white', paddingTop:10}} onPress={()=>this.props.navigation.openDrawer()}/>
					</Left>
				</Header>
				<View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
				<Text>Home Screen</Text>
				</View>
			</View>
		)
	}
}


  