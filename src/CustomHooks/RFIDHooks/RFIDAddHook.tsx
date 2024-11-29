import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRFIDdata } from '../../reducer/RFIDList/RFIDListAction';
import { RootState, store } from '../../reducer/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppNavigationParams } from '../../navigation/NavigationStackList';
import showCustomToast from '../../reuseableComponent/modal/CustomToast';
import { useLayout } from '@react-native-community/hooks';
import { Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

const MODEL_LIST = [
  { name: 'AUR221', value: 'AUR221' },
  { name: 'AUR145', value: 'AUR145' },
  { name: 'AHR023', value: 'AHR023' },
  { name: 'FX9600', value: 'FX9600' },
  { name: 'AHR023-OLD', value: 'AHR023-OLD' },
];

export function useRfidAddForm() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [name, setName] = useState('');
  const [modal, setModal] = useState<string | null>(null);
  const [IPAddress, setIPAddress] = useState('');
  const [port, setPort] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { buCode, token } = useSelector(
    (state: RootState) => state.authentication,
  );
  const Loader = useSelector((state: RootState) => state.rfidList.loader);
  const smartControllerLoader = useSelector(
    (state: RootState) => state.uploadGeneric.loader,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.headerTitle}>
            Add Reader Details
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Name is required';
    if (!modal) newErrors.modal = 'Model number is required';
    if (modal !== 'FX9600') {
      if (!IPAddress) newErrors.IPAddress = 'IP address is required';
      if (!port) newErrors.port = 'Port number is required';
    }
    return newErrors;
  };

  const handleSaveData = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const rfidData = {
      name,
      model: modal,
      ...(modal !== 'FX9600' && { ip: IPAddress, port }),
    };

    try {
      store.dispatch(CreateRFIDdata({ rfidData, token, buCode })).unwrap();
      showCustomToast('success', 'Data saved successfully!');

      // Delay navigation to allow toast time to display
      setTimeout(() => {
        navigation.navigate('RfidReader');
      }, -400);
    } catch (err) {
      showCustomToast(
        'fail',
        err || 'Something went wrong! Please try again...',
      );
    }
  };

  const handleInputFocus = (field: string) => {
    setErrors((prevErrors: any) => ({ ...prevErrors, [field]: undefined }));
    if (field === 'modal') setDropdownVisible(true);
  };

  const handleModalSelect = (selectedModel: { name: string; value: string }) => {
    setModal(selectedModel.value);
    setDropdownVisible(false);
    if (selectedModel.value === 'FX9600') {
      setIPAddress('');
      setPort('');
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        IPAddress: undefined,
        port: undefined,
      }));
    }
  };

  return {
    name,
    modal,
    IPAddress,
    port,
    errors,
    dropdownVisible,
    Loader,
    smartControllerLoader,
    MODEL_LIST,
    setName,
    setIPAddress,
    setPort,
    setModal,
    handleSaveData,
    handleInputFocus,
    handleModalSelect,
    setDropdownVisible,
  };
};
const styles = StyleSheet.create({
  headerTitle: {
    color: colors.darkblack,
    fontSize: fontSizes.heading,
  },
});