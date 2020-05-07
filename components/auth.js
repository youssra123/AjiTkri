import { AsyncStorage } from "react-native";



export default class Authentication{
    constructor(){
        
    }
    async isAuthenticated(){
           
            let context = this;
            try {
               let value = await AsyncStorage.getItem('user');
               if (value != null){
                  return true;
               }
               else {
                  return false;
              }
            } catch (error) {
              // Error retrieving data
            }
        
        
    }

    

}

