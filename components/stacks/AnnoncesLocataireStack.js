import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnnoncesLocataire from '../AnnoncesLocataire';



const AnnoncesStack = createStackNavigator();

export default function AnnoncesLocataireStack(){
    return(
      <AnnoncesStack.Navigator>
        <AnnoncesStack.Screen name="Mes annonces" component={AnnoncesLocataire} />
      </AnnoncesStack.Navigator>
    );
}


