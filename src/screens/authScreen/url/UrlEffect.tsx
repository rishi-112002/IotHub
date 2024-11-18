import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppNavigationParams } from '../../../navigation/NavigationStackList';
import { setBaseUrl } from '../../../reducer/Login/LoginReducer';
import { RootState, store } from '../../../reducer/Store';
import { GetUrls } from '../../../reducer/url/UrlAction';
import showCustomToast from '../../../reuseableComponent/modal/CustomToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface urlScreenParams {
  baseUrls: string;
}
function UrlEffect() {
  const route = useRoute<RouteProp<{ params: urlScreenParams }, 'params'>>();
  const passedBaseUrl = route.params?.baseUrls || '';
  const [url, setUrl] = useState(passedBaseUrl);
  const isLogedIn = useSelector(
    (state: RootState) => state.authentication.isLogIn,
  );

  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ url?: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const slideUpAnim = useRef(new Animated.Value(200)).current;
  const [loading, setLoading] = useState(false);

  // Validating URL input and enabling/disabling button
  const handleUrlChange = (input: string) => {
    const newValue = input.replace(/\s/g, '');
    if (input !== newValue) {
      setErrors(prev => ({ ...prev, url: 'URL cannot contain spaces' }));
    } else {
      setErrors(prev => ({ ...prev, url: undefined }));
    }
    setUrl(newValue);

    setIsButtonDisabled(
      !(newValue.startsWith('http://') || newValue.startsWith('https://')),
    );
  };

  const handleClick = async () => {
    // console.log("hello form handle Url screen")
    const newErrors: { url?: string } = {};

    if (!url) {
      newErrors.url = 'Please enter the URL';
    } else {
      setLoading(true);
      try {
        // Wait for dispatch to complete and check the result
        const resultAction = store.dispatch(GetUrls({ baseUrl: url }));

        if (!GetUrls.fulfilled.match(resultAction)) {
          await AsyncStorage.setItem('baseurl', url);
          dispatch(setBaseUrl(url));

          // Navigate based on login status
          if (url === passedBaseUrl && isLogedIn) {
            navigation.navigate('HomeScreen');
          } else {
            navigation.navigate('LoginScreen');
          }
        } else {
          // Handle errors from the action if any
          showCustomToast('error', 'Please check the URL and try again.');
        }
      } catch (error) {
        showCustomToast(
          'error',
          'Failed to fetch configuration. Please check the URL and try again.',
        );
      } finally {
        setLoading(false); // Hide loader after processing
      }
    }

    setErrors(newErrors);
  };

  // Slide-up animation
  useEffect(() => {
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [slideUpAnim]);

  return {
    url,
    navigation,
    slideUpAnim,
    setBaseUrl,
    loading,
    handleUrlChange,
    setUrl,
    handleClick,
    isButtonDisabled,
    errors,
  };
}
export default UrlEffect;
