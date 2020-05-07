import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnnonceScreen from '../AnnonceScreen';

const AnnonceStack = createStackNavigator();

export default function OffreStackScreen(){
    return(
      <AnnonceStack.Navigator>
        < AnnonceStack.Screen name="Annonces" component={AnnonceScreen} />
      </AnnonceStack.Navigator>
    );
}


