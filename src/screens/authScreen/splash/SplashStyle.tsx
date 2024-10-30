import {StyleSheet} from 'react-native';
import colors from '../../../assets/color/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function SplashStyle() {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#1976d2',
    },
    ringContainer: {
      backgroundColor: colors.blueLighter,
      borderRadius: 999,
      padding: hp(5),
    },
    logo: {
      width: hp(25),
      height: hp(25),
      borderRadius: hp(15),
      resizeMode: 'center',
    },
  });
  return {
    styles,
  };
}
export default SplashStyle;
