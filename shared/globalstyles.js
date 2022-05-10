import { StyleSheet } from 'react-native';
// Montserrat_100Thin,
// Montserrat_100Thin_Italic,
// Montserrat_200ExtraLight,
// Montserrat_200ExtraLight_Italic,
// Montserrat_300Light,
// Montserrat_300Light_Italic,
// Montserrat_400Regular,
// Montserrat_400Regular_Italic,
// Montserrat_500Medium,
// Montserrat_500Medium_Italic,
// Montserrat_600SemiBold,
// Montserrat_600SemiBold_Italic,
// Montserrat_700Bold,
// Montserrat_700Bold_Italic,
// Montserrat_800ExtraBold,
// Montserrat_800ExtraBold_Italic,
// Montserrat_900Black,
// Montserrat_900Black_Italic 

export default StyleSheet.create({
  screen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  header: {
    fontFamily: 'Montserrat_700Bold',
  },
  headline: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
  },
  metadata: {
    fontFamily: 'Montserrat_300Light_Italic',
    fontSize: 16,
  },
  blurb: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
  },
  linebreak: {
    height: 18,
  },
});
