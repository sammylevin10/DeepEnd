import React, {Component} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Account from './screens/Account';
import Feed from './screens/Feed';
import Preferences from './screens/Preferences';
import Statistics from './screens/Statistics';

const Drawer = createDrawerNavigator();

/*
Proof of Concept for DeepEnd App
Sammy Levin

Note: This app does not work on web, open it in mobile native to try it out
Features demonstrated
- Implementation of drawer navigator
- Implementation of snap carousel within drawer navigator page
- Querying of NewsData API using axios
- Populating carousel with API Data
*/

class App extends Component {

  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Feed">
          <Drawer.Screen name="Feed" component={Feed} />
          <Drawer.Screen name="Account" component={Account} />
          <Drawer.Screen name="Preferences" component={Preferences} />
          <Drawer.Screen name="Statistics" component={Statistics} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;