import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  CheckBox,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
const baseUrl = 'https://reqres.in';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [],
    };
  }

  // componentDidMount() {
  //   axios.get(`https://newsdata.io/api/1/news?apikey=pub_5653720a293e01cee44d6012eb920585d703`).then((res) => {
  //     // const carouselItems = res.data.results;
  //     // this.setState({ carouselItems });
  //   });
  // }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 5,
          width: '100%',
          height: '90%',
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: 'lightGrey', paddingTop: 50 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          
        </View>
      </SafeAreaView>
    );
  }
}

// export default Feed;
// <Carousel
//             layout={'default'}
//             data={this.state.carouselItems}
//             sliderWidth={300}
//             itemWidth={300}
//             renderItem={this._renderItem}
//             onSnapToItem={(index) => this.setState({ activeIndex: index })}
//           />
