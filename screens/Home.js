import React from "react";
import {Button} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/elements'
import Feed from '../screens/Feed'
import Article from '../screens/Article'
import globalstyles from '../shared/globalstyles';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Feed" 
        component={Feed}  
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Article" 
        component={Article} 
        options={{
            headerShown: false
          }}
      />
    </Stack.Navigator>
  );
}