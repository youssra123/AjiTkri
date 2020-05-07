import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OffresLocataire from '../OffresLocataire';
import CommentaireOffre from '../CommentaireOffre'
import AfficheDOffre from '../AfficheDOffre'



const OffresStack = createStackNavigator();

export default function OffresLocataireStack(){
    return(
      <OffresStack.Navigator>
        <OffresStack.Screen name="ListOffres" component={OffresLocataire} options={{
          headerTintColor:'#fff',
          headerTitle:'Offres',
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
         <OffresStack.Screen name="Commentaires" component={CommentaireOffre} options={{
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
           <OffresStack.Screen name="DétailsOffre" component={AfficheDOffre} options={{
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
        
        
      </OffresStack.Navigator>
    );
}


