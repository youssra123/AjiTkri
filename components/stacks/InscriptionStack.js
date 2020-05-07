import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inscription from '../Inscription';

const InscriptionStack = createStackNavigator();

export default function InscriptionStackScreen(){
    return(
      <InscriptionStack.Navigator>
        < InscriptionStack.Screen name="Inscription" component={Inscription} options={{
          headerTintColor:'#fff',
          headerTitle:'Créer votre compte',
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
      </InscriptionStack.Navigator>
    );
}


