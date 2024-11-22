import {useEffect, useRef, useState} from 'react';
import showCustomToast from '../../../reuseableComponent/modal/CustomToast';
import {Animated, Easing} from 'react-native';
import {RootState, store} from '../../../reducer/Store';
import {loginUser} from '../../../reducer/Login/LoginAction';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppNavigationParams} from '../../../navigation/NavigationStackList';
import NetInfo from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';

function LoginEffect() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>({
    name: '',
    code: '',
  });
  const {buinessunits} = useSelector((State: RootState) => State.buinessUnits);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState(false); // Loader state
  const loginStatus = useSelector(
    (state: RootState) => state.authentication.status,
  );
  const [isFocused, setIsFocused] = useState(false);
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const slideUpAnim = useRef(new Animated.Value(200)).current;

  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
    setIsButtonDisabled(false);
  };

  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const [errors, setErrors] = useState<{userName?: string; password?: string}>(
    {},
  );

  const validateForm = () => {
    const newErrors: {userName?: string; password?: string} = {};

    if (!userName) {
      newErrors.userName = 'Username is required';
    } else if (/\s/.test(userName)) {
      newErrors.userName = 'Username cannot contain spaces';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password should be min of 8 characters';
    }

    setErrors(newErrors);
    setLoader(true);
    return Object.keys(newErrors).length === 0;
  };
  const handleUserNameChange = (input: string) => {
    const newValue = input.replace(/\s/g, '');
    if (input !== newValue) {
      setErrors(prev => ({
        ...prev,
        userName: 'Username cannot contain spaces',
      }));
    } else {
      setErrors(prev => ({...prev, userName: undefined}));
    }
    setUserName(newValue);
  };

  const handleLogin = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      showCustomToast(
        'fail',
        'Please check your internet connection and try again.',
      );
      setLoader(false);
      return;
    }
    if (validateForm()) {
      const loginData = {
        username: userName,
        password: password,
        buCode: selectedOption.code,
      };

      try {
        await store.dispatch(loginUser({loginData, baseUrls}));
      } catch (e) {
        showCustomToast('error', e);
      }
    }
  };

  const handleVisibityClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCloseModal = () => {
    setIsFocused(false);
  };

  const handleOpenModal = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    Animated.timing(slideUpAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [slideUpAnim]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLoginStatus = () => {
    if (loginStatus === 'succeeded') {
      setLoader(false);
      navigation.navigate('Drawer', {screen: 'bottomTabNavigation'});
    } else if (loginStatus === 'failed') {
      showCustomToast(
        'error',
        ' Your authentication information is incorrect. Please try again.',
      );
      setLoader(false);
    }
  };

  useEffect(() => {
    handleLoginStatus();
  }, [handleLoginStatus]);

  return {
    loader,
    userName,
    errors,
    handleUserNameChange,
    password,
    passwordVisible,
    handleCloseModal,
    handleVisibityClick,
    setPassword,
    slideUpAnim,
    buinessunits,
    isFocused,
    handleOpenModal,
    handleOptionSelected,
    selectedOption,
    baseUrls,
    navigation,
    handleLogin,
    isButtonDisabled,
  };
}
export default LoginEffect;
