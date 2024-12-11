import { useCallback, useEffect, useRef, useState } from 'react';
import showCustomToast from '../../../reuseableComponent/modal/CustomToast';
import { Animated, Easing } from 'react-native';
import { RootState, store } from '../../../reducer/Store';
import { loginUser } from '../../../reducer/Login/LoginAction';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../../navigation/NavigationStackList';
import NetInfo from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';
import { resetStatus } from '../../../reducer/Login/LoginReducer';
import { errorStrings, Strings } from '../../../assets/constants/Lable';

function LoginEffect() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<any>({
    name: '',
    code: '',
  });
  const { buinessunits } = useSelector((State: RootState) => State.buinessUnits);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
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
  const [errors, setErrors] = useState<{ userName?: string; password?: string }>(
    {},
  );

  const validateForm = () => {
    const newErrors: { userName?: string; password?: string } = {};

    if (!userName) {
      newErrors.userName = errorStrings.USER_NAME_ERROR_TEXT;
    } else if (/\s/.test(userName)) {
      newErrors.userName = errorStrings.USER_NAME_SPACE_ERROR;
    }

    if (!password) {
      newErrors.password = errorStrings.PASSWORD_ERROR;
    } else if (password.length < 8) {
      newErrors.password = errorStrings.PASSWORD_LENGTH_ERROR;
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
        userName: errorStrings.USER_NAME_SPACE_ERROR,
      }));
    } else {
      setErrors(prev => ({ ...prev, userName: undefined }));
    }
    setUserName(newValue);
  };

  const handleLogin = async () => {
    const netInfo = await NetInfo.fetch();
    setLoader(true)
    if (!netInfo.isConnected) {
      showCustomToast(
        Strings.FAIL,
        errorStrings.INTERNET_ERROR
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
        store.dispatch(loginUser({ loginData, baseUrls }));
      } catch (e) {
        showCustomToast(Strings.ERROR_s, e);
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
  const handleLoginStatus = useCallback(() => {
    if (loginStatus === 'succeeded') {
      setLoader(false);
      store.dispatch(resetStatus());
      navigation.navigate('Drawer', { screen: 'bottomTabNavigation' });
    } else if (loginStatus === 'failed') {
      showCustomToast(
        'error',
        errorStrings.AUTHENTICATON_ERROR,
      );
      setLoader(false);
    }
  }, [loginStatus, navigation]);

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
