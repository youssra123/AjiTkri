import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen';
import EditProfileScreen from '../EditProfileScreen';
import Image from '../Image';



const ProfileStack = createStackNavigator();

export default function ProfileStackScreen(){
    return(
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
          headerTintColor:'#fff',
          headerTitle:'Mon profil',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
        <ProfileStack.Screen  name="Edit" component={EditProfileScreen} options={{
          headerTintColor:'#fff',
          headerTitle:'Editer mon profil',
          headerTitleAlign:'left',
          headerTitleStyle:{
            fontSize:17,
            
          },
          headerStyle: {
            backgroundColor: '#46185f',
          },  
          backgroundColor:'#e5dfdf'
        }}/>
        <ProfileStack.Screen  name="Image" component={Image}/>
      </ProfileStack.Navigator>
    );
}


