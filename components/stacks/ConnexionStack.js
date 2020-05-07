import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Connexion from '../Connexion';




const ConnexionStack = createStackNavigator();

export default function ConnexionStackScreen(){
    return(
      <ConnexionStack.Navigator>
        <ConnexionStack.Screen name="Connexion" component={Connexion} options={{
          headerTintColor:'#fff',
          headerTitle:'Connectez-vous',
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
      </ConnexionStack.Navigator>
    );
}


