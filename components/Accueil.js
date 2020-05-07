import React from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Authentication from './auth'

export default class Accueil extends React.Component {

    constructor(props){
        super(props);
        this.state={
            client:null
        }
    }



    

    render() {
        return (
            <View>
               <Text>Home page</Text>
            </View>
        )
    }

}