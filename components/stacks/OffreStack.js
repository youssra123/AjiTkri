import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OffreScreen from '../OffreScreen';
import UpdateOffre from '../UpdateOffre';
import AfficheDOffreLocateur from '../AfficherDOffreLocateur'
import CommentaireOffre  from '../CommentaireOffre'


const OffreStack = createStackNavigator();

export default function OffreStackScreen(){
    return(
      <OffreStack.Navigator>
        < OffreStack.Screen name="Offres" component={OffreScreen} />
        <OffreStack.Screen name="UpdateOffre" component={UpdateOffre} options={{
          headerTitle: "Modifier offre",
          
        }}/>
        <OffreStack.Screen name="DétailsOffreLocateur" component={AfficheDOffreLocateur} options={{
          headerTintColor:'#fff',
          headerTitle:'Détails',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
        <OffreStack.Screen name="Commentaires" component={CommentaireOffre} options={{
          headerTintColor:'#fff',
          headerTitle:'Commentaires',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>

      </OffreStack.Navigator>
    );
}


