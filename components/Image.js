import React from 'react'
import {View,Text} from 'react-native'
import UploadImage from './UploadImage'

export default class Image extends React.Component{

    render(){
        return(
            <View>
                <Text>Heloo</Text>
                <UploadImage />
            </View>
        )
    }

    
}