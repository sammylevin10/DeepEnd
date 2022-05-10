import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  Pressable,
  TextInput,
  CheckBox,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import globalstyles from '../shared/globalstyles';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}



function Card(props) {
  const { item, index, navigation, myColorTheme, myBackgroundColor, myTextColor } = props;
  const [colorTheme, setColorTheme] = useState(new Animated.Value(0));
  useEffect(() => {
    setColorTheme(myColorTheme);
  }, [myColorTheme]);
  const interpolatedBackgroundColor =  colorTheme.interpolate({
      inputRange: [0, 1],
      outputRange:["rgba(230,230,230,0.7)" , "rgba(50,50,50,0.7)"]
    });
  return (
    <TouchableWithoutFeedback
          onLongPress={() => {
            console.log("press");
            navigation.navigate('Article', {item: item});
          }}
          
        >
    <View 
      style={[
          styles.card,
          {
            backgroundColor: myBackgroundColor
          }
        ]}
    >
      <Image
        style={styles.thumbnail}
        source={{
          uri: item.image_url,
        }}
      />
      <View style={
        styles.textContainer}>
        <Text 
          style={[
            globalstyles.headline,
            {
              color: myTextColor
            }
          ]}
        >
        {item.title}
        </Text>
        <View style={globalstyles.linebreak}></View>
        <Text 
          style={[
            globalstyles.metadata,
            {
              color: myTextColor
            }
          ]}>{toTitleCase(item.source_id)}</Text>
        <View style={globalstyles.linebreak}></View>
        <Text 
        style={[
            globalstyles.blurb,
            {
              color: myTextColor
            }
          ]}
        >{item.description}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: '100%',
    height: '100%',
    marginLeft: 15,
    marginRight: 15,
  },
  thumbnail: {
    height: '40%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  textContainer: {
    padding: 20,
    
  }
});

export default Card;
