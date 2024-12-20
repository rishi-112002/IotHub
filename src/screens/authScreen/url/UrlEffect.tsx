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
import { errorStrings, Strings } from '../../../assets/constants/Lable';

interface urlScreenParams {
  baseUrls: string;
}
function UrlEffect() {
  const route = useRoute<RouteProp<{ params: urlScreenParams }>>();
  const passedBaseUrl = route.params?.baseUrls || '';
  const [url, setUrl] = useState(passedBaseUrl);
  const isLogedIn = useSelector(
    (state: RootState) => state.authentication.isLogIn,
  );
  const urlError = useSelector(
    (state: RootState) => state.getUrls.error,
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
      setErrors(prev => ({ ...prev, url: errorStrings.BASE_URL_SPACE_ERROR }));
    } else {
      setErrors(prev => ({ ...prev, url: undefined }));
    }
    setUrl(newValue);

    setIsButtonDisabled(
      !(newValue.startsWith(Strings.HTTPS) || newValue.startsWith(Strings.HTTPS)),
    );
  };

  const handleClick = async () => {
    const newErrors: { url?: string } = {};

    if (!url) {
      newErrors.url = errorStrings.BASE_URL_EMPTY_ERROR;
    } else {
      setLoading(true);
      try {
        // Await the dispatch and get the result
        const resultAction = await store.dispatch(GetUrls({ baseUrl: url }));

        if (GetUrls.fulfilled.match(resultAction)) {
          // Thunk succeeded, save the base URL and update state
          await AsyncStorage.setItem('baseurl', url);
          dispatch(setBaseUrl(url));

          // Navigate based on login status
          if (url === passedBaseUrl && isLogedIn) {
            navigation.navigate('Drawer', { screen: 'bottomTabNavigation' });
          } else {
            navigation.navigate('LoginScreen');
          }
        } else if (GetUrls.rejected.match(resultAction)) {
          // Thunk failed, handle errors
          const errorMessage = resultAction.payload as string;
          showCustomToast(Strings.ERROR_s, errorMessage || errorStrings.BASE_URL_WRONG_ERROR);
        }
      } catch (error) {
        // Handle unexpected errors
        showCustomToast(
          Strings.ERROR_s,
          errorStrings.BASE_URL_WRONG_ERROR
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
    urlError,
  };
}
export default UrlEffect;
