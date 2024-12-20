import {StyleSheet} from 'react-native';
import fontSizes from '../assets/fonts/FontSize';
import colors from '../assets/color/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const STYLES = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.AppPrimaryColor},
  FLEX_1: {flex: 1},
  FLEX_05: {flex: 0.5},
  Login_container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  SpotList_headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
  Home_searchBarContainer: {
    marginTop: 60,
    marginBottom: 5,
  },
  Home_listWrapper: {
    zIndex: 9999,
    paddingHorizontal: 4.5,
  },
  Generic_modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WebBridge_animatedContainer: {
    position: 'relative',
    flex: 1,
  },
  Home_container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 9999,
  },
  EventLog_Screen_View: {flex: 1, paddingBottom: 60},
  noResultsText: {
    justifyContent: 'center',
    fontSize: fontSizes.text,
    color: colors.gray,
    paddingVertical: 100,
    textAlign: 'center',
  },
  AllEVENT_contentContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.white,
  },
  Sequential_LOADER_BACKGROUND: {
    flex: 1,
    backgroundColor: colors.white,
  },
  No_Internet_View: {flex: 1, justifyContent: 'center', alignSelf: 'center'},
  Login_loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    fontWeight: '800',
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  Login_heading: {
    fontSize: 25,
    color: colors.AppPrimaryColor,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  Login_inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  Login_lableHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkblack,
  },
  Login_input: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    paddingVertical: 10,
  },
  Login_icon: {
    paddingLeft: 10,
  },
  Login_sub_heading: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.darkblack,
    paddingTop: 5,
    paddingBottom: 50,
    paddingHorizontal: 17,
  },
  Login_textContainer: {
    alignItems: 'center',
  },
  Login_subText: {
    fontSize: 15,
    color: colors.AppPrimaryColor,
    fontWeight: '600',
  },
  Login_signInStyle: {
    paddingTop: '5%',
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: '5%',
    paddingStart: 20,
  },
  Login_Custom_Input_Style: {flex: 1, color: colors.PrimaryTextColor},
  Login_Button: {
    borderWidth: 1,
    borderColor: colors.AppPrimaryColor,
    marginTop: 20,
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
  },
  Login_dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20, // Adjust as needed
  },
  Login_line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  Login_orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666',
  },

  //Splash,
  Splash_container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1976d2',
  },
  Splash_ringContainer: {
    backgroundColor: colors.blueLighter,
    borderRadius: 999,
    padding: hp(5),
  },
  Splash_logo: {
    width: hp(25),
    height: hp(25),
    borderRadius: hp(15),
    resizeMode: 'center',
  },

  //URL STYLE
  URL_inputContainer: {
    paddingTop: 30,
  },
  URL_heading: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.darkblack,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  URL_row: {
    flexDirection: 'row',
    paddingBottom: '5%',
    paddingStart: 10,
    paddingTop: '5%',
  },
  URL_sub_heading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkblack,
  },
  URL_customButtonContainer: {
    paddingTop: '40%',
  },
  URL_backIcon: {
    marginRight: 15,
  },
  URL_headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },

  //SpotInfo
  SpotInfo_section: {
    // backgroundColor: colors.white,
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  SpotInfo_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 5,
    alignItems: 'center',
  },
  SpotInfo_subHeader: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.PrimaryTextColor,
    marginTop: 8,
  },
  SpotInfo_statusContainer: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  SpotInfo_statusText: {
    fontSize: 12,
  },
  SpotInfo_label: {
    fontSize: fontSizes.smallText,
    color: colors.HelperTextColor,
  },
  SpotInfo_value: {
    marginBottom: 10,
    fontSize: 12,
    color: colors.SecondaryTextColor,
    fontWeight: '400',
  },
  SpotInfo_value2: {
    marginBottom: 10,
    fontSize: 14,
    color: colors.SecondaryTextColor,
  },
  SpotInfo_EventText: {
    marginBottom: 5,
    fontSize: 12,
    color: colors.SecondaryTextColor,
    fontWeight: '500',
  },
  SpotInfo_SecurityTag: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  SpotDetails_headerTitle: {
    color: colors.SecondaryTextColor,
    fontSize: fontSizes.heading,
  },
  SpotDetails_divider: {
    borderWidth: 1,
    borderColor: colors.DividerColor,
  },
});
