import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CreateRFIDdata } from '../../reducer/RFIDList/RFIDListAction';
import { RootState, store } from '../../reducer/Store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import showCustomToast from '../../reuseableComponent/modal/CustomToast';

const MODEL_LIST = [
  { name: 'AUR221', value: 'AUR221' },
  { name: 'AUR145', value: 'AUR145' },
  { name: 'AHR023', value: 'AHR023' },
  { name: 'FX9600', value: 'FX9600' },
  { name: 'AHR023-OLD', value: 'AHR023-OLD' },
];

export const useRfidAddForm = () =>
// navigation: NavigationProp<AppNavigationParams>,
{
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!modal) {
      newErrors.modal = 'Model number is required';
    }
    if (modal !== 'FX9600') {
      if (!IPAddress) {
        newErrors.IPAddress = 'IP address is required';
      }
      if (!port) {
        newErrors.port = 'Port number is required';
      }
    }
    return newErrors;
  };

  // useLayoutEffect(() => {

  // }, [AddError, Status, navigation]);

  const handleSaveData = async () => {
    // Validate the form and set errors if any
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare RFID data payload
    const rfidData = {
      name,
      model: modal,
      ...(modal !== 'FX9600' && { ip: IPAddress, port }),
    };

    try {
      // Dispatch the action to save RFID data
      store.dispatch(CreateRFIDdata({ rfidData, token, buCode }));
      // showCustomToast('success', 'Data saved successfully!');
      // navigation.navigate('RfidReader');
      // if (Status === 'success') {
      //   store.dispatch(resetUploadStatus());
      // } else if (Status === 'failure') {
      //   showCustomToast('fail', AddError);
      //   store.dispatch(resetUploadStatus());
      // }
      // store.dispatch(resetUploadStatus());

      // setTimeout(() => {
      //   navigation.navigate('RfidReader');
      // }, 300);
    } catch (error) {
      // Extract error message or show a generic one
      const errorMessage = error || 'Something went wrong! Please try again.';
      showCustomToast('fail', errorMessage);
    }
  };

  const handleInputFocus = (field: string) => {
    setErrors((prevErrors): any => ({ ...prevErrors, [field]: undefined }));
    if (field === 'modal') {
      setDropdownVisible(true);
    }
  };

  const handleModalSelect = (selectedModel: {
    name: string;
    value: string;
  }) => {
    setModal(selectedModel.value);
    setDropdownVisible(false);
    if (selectedModel.value === 'FX9600') {
      setIPAddress('');
      setPort('');
      setErrors((prevErrors): any => ({
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