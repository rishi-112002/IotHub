import { StyleSheet } from 'react-native';
import colors from '../../../assets/color/colors';

function UrlStyles() {
  const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: colors.AppPrimaryColor },
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: 'white',
      borderTopEndRadius: 25,
      borderTopStartRadius: 25,
    },
    inputContainer: {
      paddingTop: 30,
    },
    heading: {
      fontSize: 25,
      fontWeight: '700',
      color: colors.darkblack,
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    row: {
      flexDirection: 'row',
      paddingBottom: '5%',
      paddingStart: 10,
      paddingTop: '5%',
    },
    sub_heading: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.darkblack,

    },
    customButtonContainer: {
      paddingTop: '40%',
    },
    backIcon: {
      marginRight: 15,
    },
    headerTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: '700',
    },
  });
  return {
    styles,
  };
}
export default UrlStyles;
