import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsLogement  from '../DetailsLogement';
import MesLogements  from '../MesLogements';
import Offres from '../Offres'
import ModifierLogement from '../ModifierLogement'
import ModifierLogementNext from '../ModifierLogementNext'
import QuartierScreen from '../QuartierScreen'
import LogementScreen from '../LogementScreen'
import PageOSceen from '../PageOScreen'
import DetailScreen from '../DetailScreen'
import UpdateOffre from '../UpdateOffre'

import {Button} from 'react-native'

const LogementStack = createStackNavigator();

export default function LogementStackScreen(){
    return(
      <LogementStack.Navigator>
        <LogementStack.Screen name="Logements" component={MesLogements} options={{
          headerTintColor:'#fff',
          headerTitle:'Mes logements',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
        <LogementStack.Screen name="Details" component={DetailsLogement} options={{
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
        <LogementStack.Screen name="Quartier" component={QuartierScreen} options={{
          headerTintColor:'#fff',
          headerTitle:'Quel quartier ?',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
        <LogementStack.Screen name="Offres" component={Offres} options={{
          headerTintColor:'#fff',
          headerTitle:'Informations supplémentaires',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }} />
        <LogementStack.Screen name="DetailScreen" component={DetailScreen} options={{
          headerTintColor:'#fff',
          headerTitle:'Ajouter un offre',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }} />
        <LogementStack.Screen name="PageOScreen" component={PageOSceen}options={{
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
        }}  />
        <LogementStack.Screen name="UpdateOffre" component={UpdateOffre} />

        <LogementStack.Screen name="Logement" component={LogementScreen} options={{
          headerTintColor:'#fff',
          headerTitle:'logement',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }} />
        <LogementStack.Screen name="ModifierLogement" component={ModifierLogement} options={{
          headerTintColor:'#fff',
          headerTitle:'Editer le quartier',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }} />
        <LogementStack.Screen name="Information Logement" component={ModifierLogementNext} options={{
          headerTintColor:'#fff',
          headerTitle:'Editer le logement',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>

    

      </LogementStack.Navigator>
    );
}


