import {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {EditRFIDdata} from '../../reducer/RFIDList/RFIDListAction';
import {RootState, store} from '../../reducer/Store';
import showCustomToast from '../../reuseableComponent/modal/CustomToast'; // Import the toast function
import {AppNavigationParams} from '../../navigation/NavigationStackList';
import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

interface RFIDItem {
  id: string;
  name: string;
  model?: string;
  ip: string;
  port: number;
}

export const useEditRfid = (item: RFIDItem) => {
  const [name, setName] = useState<string>(item.name);
  const [model, setModel] = useState<string>(item.model || '');
  const [IPAddress, setIPAddress] = useState<string>(item.ip);
  const [port, setPort] = useState<number>(item.port);
  const [storedIp, setStoredIp] = useState<string>(item.ip);
  const [storedPort, setStoredPort] = useState<number>(item.port);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [showIpAndPortFields, setShowIpAndPortFields] = useState<boolean>(
    model !== 'FX9600',
  );
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const navigation = useNavigation<NavigationProp<AppNavigationParams>>();
  const dispatch = useDispatch();

  const Loader = useSelector((state: RootState) => state.rfidList.loader);
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const smartControllerLoader = useSelector(
    (state: RootState) => state.uploadGeneric.loader,
  );

  const handleInputFocus = useCallback(
    (field: keyof typeof errors) => {
      setErrors((prevErrors: any) => ({...prevErrors, [field]: undefined}));
    },
    [errors],
  );

  const validateInputs = useCallback(() => {
    const newErrors: {name?: string; IPAddress?: string; port?: string} = {};
    if (!name) newErrors.name = 'Name is required';
    if (!IPAddress && showIpAndPortFields)
      newErrors.IPAddress = 'IP address is required';
    if (!port && showIpAndPortFields)
      newErrors.port = 'Port number is required';
    return newErrors;
  }, [name, IPAddress, port, showIpAndPortFields]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}>Update Reader Details</Text>
        </View>
      ),
    });
  }, [navigation]);

  const handleSaveData = useCallback(async () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const rfidData = {
      name,
      model,
      id: item.id,
      ...(model !== 'FX9600' && {ip: IPAddress, port}),
    };
    try {
      store
        .dispatch(
          EditRFIDdata({
            rfidData,
            token,
            buCode,
          }),
        )
        .unwrap();

      showCustomToast('success', 'Data Update successfully!');
     
    } catch (err) {
      showCustomToast(
        'fail',
        err || 'Something went wrong! Please try again...',
      );
    }
  }, [
    dispatch,
    name,
    model,
    IPAddress,
    port,
    item.id,
    token,
    buCode,
    navigation,
    validateInputs,
  ]);

  const handleModalSelect = (selectedModel: {name: string}) => {
    setModel(selectedModel.name);

    if (selectedModel.name === 'FX9600') {
      setStoredIp(IPAddress);
      setStoredPort(port);
      setIPAddress('');
      setPort(0);
      setShowIpAndPortFields(false);
    } else {
      setIPAddress(storedIp);
      setPort(storedPort);
      setShowIpAndPortFields(true);
    }

    setDropdownVisible(false);
  };

  return {
    name,
    model,
    IPAddress,
    port,
    errors,
    Loader,
    dropdownVisible,
    smartControllerLoader,
    showIpAndPortFields,
    setName,
    setModel,
    setIPAddress,
    setPort,
    setDropdownVisible,
    handleSaveData,
    handleInputFocus,
    handleModalSelect,
  };
};
const styles = StyleSheet.create({
  headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
});
