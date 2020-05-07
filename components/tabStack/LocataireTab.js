import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackScreen from '../stacks/ProfileStack'
import OffresLocataireStack from '../stacks/OffresLocataireStack';
import AnnoncesLocataireStack from '../stacks/AnnoncesLocataireStack';
import Authentication from '../auth'






const Tab = createBottomTabNavigator();

export default class  LocataireTab extends React.Component{
  
  render(){
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused ? 'md-person' : 'ios-person';
            } else if (route.name === 'Mes annonces') {
              iconName = focused ? 'md-megaphone' : 'ios-megaphone';
            }else if (route.name === 'Offres') {
              iconName = focused ? 'md-cart' : 'ios-cart';
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
        <Tab.Screen name="Mes annonces" component={AnnoncesLocataireStack} />
        <Tab.Screen name="Offres" component={OffresLocataireStack} />
       

      </Tab.Navigator>
      
    
  );
}
}
