import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackScreen from '../stacks/ProfileStack'
import LogementStackScreen from '../stacks/LogementStack';
import OffreStackScreen from '../stacks/OffreStack';
import AnnonceStackScreen from '../stacks/AnnonceStack';






const Tab = createBottomTabNavigator();

export default function LocateurTab() {
  return (
    
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused ? 'md-person' : 'ios-person';
            } else if (route.name === 'Mes logements') {
              iconName = focused ? 'md-key' : 'ios-key';
            }else if (route.name === 'Mes offres') {
              iconName = focused ? 'md-cart' : 'ios-cart';
            }else if (route.name === 'Annonces') {
              iconName = focused ? 'md-megaphone' : 'ios-megaphone';
            }

            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })} 
         tabBarOptions={{
          activeTintColor: '#46185f',
          inactiveTintColor: 'gray',
          style:{
            backgroundColor : '#fff', // Makes Android tab bar white instead of standard blue
            height: 100, // I didn't use this in my app, so the numbers may be off. 
            justifyContent:'center',
            alignItems:'center',
            marginBottom:-30,
            paddingTop:10,


          }
        }}
        >
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        <Tab.Screen name="Mes logements" component={LogementStackScreen} />
        <Tab.Screen name="Mes offres" component={OffreStackScreen} />
        <Tab.Screen name="Annonces" component={AnnonceStackScreen} />

      </Tab.Navigator>
  );
}
