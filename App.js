import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, Icon } from 'react-native';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Account from './screens/Account';
import Feed from './screens/Feed';
import Preferences from './screens/Preferences';
import Home from './screens/Home';
import Article from './screens/Article';
import AppLoading from 'expo-app-loading';
import globalstyles from './shared/globalstyles.js';
import { 
  useFonts,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic 
} from '@expo-google-fonts/montserrat';

const Drawer = createDrawerNavigator();

/*
NOTE
This app will not run in browser because it is not supported by Snap Carousel
You can run it on your own device using Expo Go
I tested the UI on my iPhone SE, so it may not be super responsive to other device sizes
*/

function App() {

  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={{
          drawerPosition:'left',
          drawerStyle: {
            backgroundColor: '#B496D8',
            color: `red`,
            width: 240,
          },
          drawerActiveTintColor: "#3B1866",
          drawerLabelStyle: {
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 16,
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: "Today's Headlines",
            headerStyle: {
              backgroundColor: '#43117F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: globalstyles.header,
          }}
        />
        <Drawer.Screen 
          name="Account" 
          component={Account}
          options={{
            title: "Account",
            headerStyle: {
              backgroundColor: '#43117F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: globalstyles.header,
          }}
        />
        <Drawer.Screen 
          name="Preferences" 
          component={Preferences} 
          options={{
            title: "Preferences",
            headerStyle: {
              backgroundColor: '#43117F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: globalstyles.header,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
