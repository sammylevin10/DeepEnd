import React, {Component} from 'react';
import { Button, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import globalstyles from '../shared/globalstyles';

function Preferences({ navigation }) {
  // Demo screen to show what preferences UI would look like
  return (
    <View style={styles.page}>
    <TouchableWithoutFeedback
      onPress={() => {
        alert("This is a demo screen");
    }}>
      <Image
        style={styles.preferencesImage}
        source={require('../assets/Preferences.png')}
      />
    </TouchableWithoutFeedback>
    
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: -30,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  preferencesImage: {
    maxWidth: 380,
    height: '100%',
  }
});

export default Preferences;