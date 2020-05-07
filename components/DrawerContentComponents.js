

import React from 'react';
import {  SafeAreaView, ScrollView, View, Image} from 'react-native';
import { DrawerItems} from 'react-navigation';

export default class DrawerContentComponenet extends React.Component{
    render(){
        return(
            <SafeAreaView style={{felx:1}}>
            <View style={{height:150,backgroundColor:'white', alignItems:'center',justifyContent:'center'}}>
              <Image source={require('../assets/avatar.jpg')} style={{height:120, width:120, borderRadius:60}}/>
            </View>
           <ScrollView>
            <DrawerItems {...props} />
           </ScrollView>
           </SafeAreaView>
        )
    }
}

