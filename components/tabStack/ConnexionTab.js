import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConnexionStackScreen from '../stacks/ConnexionStack'
import InscriptionStackScreen from '../stacks/InscriptionStack';


const Tab = createBottomTabNavigator();

export default function ConnexionTab() {
    
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Connexion') {
            iconName = focused ? 'ios-lock' : 'ios-lock';
          } else if (route.name === 'Inscription') {
            iconName = focused ? 'ios-person-add' : 'ios-person-add';
          }

          
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })} 
      tabBarOptions={{
        activeTintColor: '#46185f',
        inactiveTintColor: '#e5dfdf',
        style:{
          backgroundColor : '#fff', // Makes Android tab bar white instead of standard blue
          height: 100, // I didn't use this in my app, so the numbers may be off. 
          justifyContent:'center',
          alignItems:'center',
          marginBottom:-30,
          paddingTop:10,
        }
      }}>
        <Tab.Screen name="Connexion" component={ConnexionStackScreen} />
        <Tab.Screen name="Inscription" component={InscriptionStackScreen} />
      </Tab.Navigator>
  );
}
