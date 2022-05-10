import React, {Component} from 'react';
import { Button, View, StyleSheet, Text, Image, Linking } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import globalstyles from '../shared/globalstyles';
import { WebView } from 'react-native-webview';

const Article = ({ route, navigation })=>{
  const { item } = route.params;
  console.log(item);
  // Return a webview of the article url
  return (
      <WebView source={{ uri: item.url }} />
  );
}

const styles = StyleSheet.create({
});

export default Article;