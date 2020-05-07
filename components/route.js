
import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator,
  createSwitchNavigator
  
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";
import ConnexionTab from './tabStack/ConnexionTab'
import LocateurTab from './tabStack/LocateurTab'

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: LocateurTab
        },
        SignedOut: {
          screen: ConnexionTab
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };
  