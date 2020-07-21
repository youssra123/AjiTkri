import * as React from 'react';
import { Button, View,AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LocateurTab from './components/tabStack/LocateurTab'
import ConnexionTab from './components/tabStack/ConnexionTab'
import HomeScreen from './components/HomeScreen'
import AfficheReclamations from './components/AfficheReclamations'
import LocataireTab from './components/tabStack/LocataireTab';
import HomeChat from './components/Chats';
    
  
  

const Drawer = createDrawerNavigator()
export default class App extends React.Component{

 

   render(){
   return(
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Accueil">
            <Drawer.Screen name="Accueil" component={HomeScreen}/>
            <Drawer.Screen name="Espace locateur" component={ LocateurTab} />
            <Drawer.Screen name="Espace locataire" component={LocataireTab} />
            <Drawer.Screen name="Identification" component={ConnexionTab} />
            <Drawer.Screen name="Chats" component={HomeChat} />
            <Drawer.Screen name="AfficheReclamations" component={AfficheReclamations} />
        </Drawer.Navigator>
    </NavigationContainer>
   )
   }
}








