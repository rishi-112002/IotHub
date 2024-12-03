import { StyleSheet } from 'react-native';
import colors from '../../../assets/color/colors';
function LoginStyles() {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: 'white',
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    heading: {
      fontSize: 25,
      fontWeight: '800',
      color: colors.AppPrimaryColor,
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    lableHeading: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.darkblack,
    },
    input: {
      flex: 1,
      color: 'black',
      fontSize: 15,
      paddingVertical: 10,
    },
    icon: {
      paddingLeft: 10,
    },
    sub_heading: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.darkblack,
      paddingTop: 5,
      paddingBottom: 50,
      paddingHorizontal: 17,
    },
    textContainer: {
      alignItems: 'center',
    },
    subText: {
      fontSize: 15,
      color: colors.AppPrimaryColor,
      fontWeight: '600',
    },
    signInStyle: {
      paddingTop: '5%',
      color: colors.white,
      fontSize: 20,
      fontWeight: '700',
      paddingBottom: '5%',
      paddingStart: 20,
    },
    mainContainer: { flex: 1, backgroundColor: colors.AppPrimaryColor },


    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20, // Adjust as needed
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc', // Adjust color as needed
    },
    orText: {
      marginHorizontal: 10, // Adjust spacing as needed
      fontSize: 16,
      color: '#666', // Adjust color as needed
    },
  });
  return { styles };
}
export default LoginStyles;
