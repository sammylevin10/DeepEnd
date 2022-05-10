import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  CheckBox,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import Card from '../components/Card.js';
import axios from 'axios';
import globalstyles from '../shared/globalstyles';
const baseUrl = 'https://newsdata.io/api/1/news?apikey=pub_5653720a293e01cee44d6012eb920585d703&language=en';
const data = require('../common/NewsData.json');


export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [],
      depth: 0,
      translation: new Animated.Value(0),
      colorTheme: new Animated.Value(0),
      queryText: "Today's Headlines"
    };
  }

  // Based on the depth, darken the color theme
  changeColorTheme(depth) {
    let target = 0;
    switch (depth) {
      case 0:
        target = 0;
        break;
      case 1:
        target = 0.5;
        break;
      case 2:
        target = 1;
        break;
    }
    Animated.timing(this.state.colorTheme, {
      toValue: target,
      duration: 1000,
      easing: Easing.bezier(0.39, 0, 0.62, 1)
    }).start();
  }

  // Slide the carousel up and out of the way
  slideOut = (direction) => {
    let destination = 0;
    if (direction == "up") destination = -700;
    if (direction == "down") destination = 700;
    Animated.timing(this.state.translation, {
      toValue: destination,
      duration: 500,
      useNativeDriver: 'true',
      easing: Easing.bezier(.42,0,1,1)
    }).start(() => {this.slideIn(destination)});
  };

  // Slide the carousel into view
  slideIn = (destination) => {
    this.setState({ translation: new Animated.Value(-destination)});
    let currentArticle = this.state.carouselItems[this.state.activeIndex];
    if(!currentArticle) {
      this.setState({depth: 0});
    }
    switch (this.state.depth) {
      case 0:
        this.queryJson(null, null);
        break;
      case 1:
        this.queryJson(currentArticle.category, null);
        break;
      case 2:
        this.queryJson(currentArticle.category, currentArticle.keywords);
        break;
    }
    Animated.timing(this.state.translation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: 'true',
      easing: Easing.bezier(0,0,0.6,0.99)
    }).start();
  }

  // Populate carousel on component mount
  componentDidMount() {
    this.queryJson(null, null);
  }

  // Based on depth, filter content and populate carousel
  queryJson(category, keywords) {
    const {navigation} = this.props;
    let carouselItems = data;
    let newCarouselItems = [];
    let headerString = "";
    // At a depth of 0, all news articles populate the carousel
    if (category == null && keywords == null) {
      newCarouselItems = carouselItems;
      headerString = "Today's Headlines";
    } 
    // At a depth of 1, only articles whose categories match one of the current categories populate the carousel
    else if (category != null && keywords == null) {
      headerString = category[0];
      for (let i = 1; i < category.length; i++) headerString += (" | " + category[i]);
      navigation.getParent().setOptions({ title: `Today's Headlines` });
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < category.length; j++) {
          if (carouselItems[i].category.includes(category[j]) && 
            !newCarouselItems.includes(carouselItems[i]) &&
            (carouselItems[i] != this.state.carouselItems[this.state.activeIndex])
          ) {
            newCarouselItems.push(carouselItems[i]);
          }
        }
      }
    } 
    // At a depth of 2, only articles whose categories AND 2+ keywords match one of the current categories and keywords populate the carousel
    else if (category != null && keywords != null) {
      headerString = category[0];
      headerString += " → " + keywords[0];
      for (let i = 0; i < data.length; i++) {
        let keywordMatches = 0;
        // Count number of matched keywords with articles
        for (let j = 0; j < keywords.length; j++) {
          if(carouselItems[i].keywords.includes(keywords[j])) keywordMatches += 1 ;
        }
        let keywordsAndCategoriesMatch = false;
        // Assuming 2+ keywords match, determine if categories also match
        if (keywordMatches >= 2) {
          for (let j = 0; j < category.length; j++) {
            if(carouselItems[i].category.includes(category[j])) keywordsAndCategoriesMatch = true;
          }
        }
        if (keywordsAndCategoriesMatch && 
          !newCarouselItems.includes(carouselItems[i]) &&
          (carouselItems[i] != this.state.carouselItems[this.state.activeIndex])
        ) {
          newCarouselItems.push(carouselItems[i]);
        }
      }
    }
    navigation.getParent().setOptions({ title: headerString });
    this.setState({queryText: headerString});
    if (newCarouselItems.length >= 0) {
      this.setState({ carouselItems: newCarouselItems });
    }
  }

  // No longer in use, but used to query NewsData API
  queryApi(url) {
    axios
      .get(
        url
      )
      .then((res) => {
        const carouselItems = res.data.results;
        this.setState({ carouselItems });
      });
  }

  // Determine depth and animation based on swipe direction
  onSwipe(direction) {
    const {navigation} = this.props;
    let oldDepth = this.state.depth;
    let newDepth;
    if (direction == "up") {
      newDepth = Math.min(oldDepth + 1, 2);
    } else if (direction == "down") {
      newDepth = Math.max(oldDepth - 1, 0);
    }
    this.setState({ depth: newDepth });
    this.changeColorTheme(newDepth);
    if (direction == "up" && oldDepth <= 1) {
      this.slideOut("up");
    } else if (direction == "down" && oldDepth >= 1) {
      this.slideOut("down");
    }
    /* IF QUERYING API
    if (direction == "up") {
      const {navigation} = this.props;
      // headerState.setHeader("New header");
      let currentArticle = this.state.carouselItems[this.state.activeIndex];
      console.log("Keywords: ", currentArticle.keywords);
      console.log("Category: ", currentArticle.category);
      let queryUrl;
        navigation.setOptions({ title: 'Updated!' });
        queryUrl = baseUrl + "&category=" + currentArticle.category[0];
        for (let i = 1; i < currentArticle.category.length; i++) {
          queryUrl = queryUrl + "," + currentArticle.category[i];
        }
      // }
    console.log(queryUrl);
    this.queryApi(queryUrl);
    } 
    else if (direction == "down") {
      console.log("General")
      this.queryApi(baseUrl);
    }
    */
  }

  // Create a card for each carousel page with appropriate colors
  _renderItem({ item, index, navigation }) {
    let color = "";
    let textColor = "";
    if (this.state.colorTheme.__getValue() < 0.4) {
      color = "rgba(255, 255, 255, 1)";
      textColor = "rgba(30, 30, 30, 1)";
    }
    else if (this.state.colorTheme.__getValue() < 0.7) {
      color = "rgba(160, 160, 160, 1)";
      textColor = "rgba(30, 30, 30, 1)";
    }
    else {
      color = "rgba(80, 80, 80, 1)";
      textColor = "rgba(240, 240, 240, 1)";
    }
    return (
      <View>
        <Card 
          item={item} 
          index={index} 
          navigation={this.props.navigation} 
          myColorTheme = {this.state.colorTheme} 
          myBackgroundColor = {color} 
          myTextColor = {textColor} 
        />
      </View>
    );
  }

  render() {
    const navigation = this.props.navigation;
    // Based on color theme value, choose colors
    const interpolatedBackgroundColor =  this.state.colorTheme.interpolate({
      inputRange: [0, 1],
      outputRange:["rgba(230,230,230,0.7)" , "rgba(30,30,30,0.7)"]
    });
    const interpolatedTextColor =  this.state.colorTheme.interpolate({
      inputRange: [0, 1],
      outputRange:["rgba(30,30,30,1)" , "rgba(200,200,200,1)"]
    });
    return (
      <SafeAreaView style={styles.safeArea} >
        <Animated.View 
          style={{
          ...globalstyles.screen, 
          backgroundColor: interpolatedBackgroundColor
          }}
        >
        <Animated.View 
          style={{
            ...styles.carouselContainer, 
            transform: [{ translateY: this.state.translation }]
          }} 
          onTouchStart={e=> this.touchY = e.nativeEvent.pageY}
          onTouchEnd={e => {
            if (this.touchY - e.nativeEvent.pageY > 60) {
              this.onSwipe("up");
            }
            else if (this.touchY - e.nativeEvent.pageY < -60) {
              this.onSwipe("down");
          }}}
          onPress={this.fadeIn}
        >
          <Carousel
            style={styles.carousel}
            layout={'tinder'}
            loop={'true'}
            lockScrollWhileSnapping={'true'}
            useScrollView={true}
            data={this.state.carouselItems}
            sliderWidth={345}
            itemWidth={345}
            renderItem={this._renderItem.bind(this)}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            enableMomentum={'true'}
          />
        </Animated.View>
          <View style = {styles.queryTextContainer}>
            <Animated.Text style={{
              ...styles.queryText, 
              color: interpolatedTextColor
            }}>
              {this.state.queryText}
            </Animated.Text>
          </View>
        </Animated.View>
        <AnimatedLinearGradient
          colors={["rgba(255,255,255, 1)", "rgba(0,0,0, 1)"]}
          style={styles.background}
        />
      </SafeAreaView>
    );
  }
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 610,
    zIndex: -3,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:15,
    marginBottom:15,
    zIndex: 3,
  },
  carousel: {
  },
  queryTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  queryText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
  }
});