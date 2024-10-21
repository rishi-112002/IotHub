import {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {CreateRFIDdata} from '../../reducer/RFIDList/RFIDListAction';
import {RootState} from '../../reducer/Store';
import {NavigationProp} from '@react-navigation/native';

const MODEL_LIST = [
  {name: 'AUR221', value: 'AUR221'},
  {name: 'AUR145', value: 'AUR145'},
  {name: 'AHR023', value: 'AHR023'},
  {name: 'FX9600', value: 'FX9600'},
  {name: 'AHR023-OLD', value: 'AHR023-OLD'},
];

// Custom hook for managing the RFID form logic
export const useRfidAddForm = (navigation: NavigationProp<any>) => {
  const [name, setName] = useState('');
  const [modal, setModal] = useState<string | null>(null);
  const [IPAddress, setIPAddress] = useState('');
  const [port, setPort] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const CreateError = useSelector(
    (state: RootState) => state.rfidList.errors.create,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const Loader = useSelector((state: RootState) => state.rfidList.loader);
  const smartControllerLoader = useSelector(
    (state: RootState) => state.genericAddDetail.smartControllerLoader,
  );

  // Validates the form fields
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!name) newErrors.name = 'Name is required';
    if (!modal) newErrors.modal = 'Model number is required';

    // Validate IP and Port only if model is not FX9600
    if (modal !== 'FX9600') {
      if (!IPAddress) newErrors.IPAddress = 'IP address is required';
      if (!port) newErrors.port = 'Port number is required';
    }
    return newErrors;
  };

  // Handles data submission
  const handleSaveData = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data based on the selected model
    const rfidData = {
      name,
      model: modal,
      ...(modal !== 'FX9600' && {ip: IPAddress, port}),
    };
    // console.log(rfidData);

    try {
      await dispatch(
        CreateRFIDdata({
          rfidData,
          token,
          buCode,
        }),
      ).unwrap();
      setSuccessMessage('Data saved successfully!');
    } catch (err) {
      Alert.alert('Error', err);
    }
  };

  // Resets field-specific errors when input is focused
  const handleInputFocus = (field: string) => {
    setErrors(prevErrors => ({...prevErrors, [field]: undefined}));
    if (field === 'modal') {
      setDropdownVisible(true);
    }
  };

  // Handles model selection from the modal
  const handleModalSelect = (selectedModel: {name: string; value: string}) => {
    setModal(selectedModel.value);
    setDropdownVisible(false);

    // If FX9600 is selected, reset IP and Port and clear errors for them
    if (selectedModel.value === 'FX9600') {
      setIPAddress('');
      setPort('');
      setErrors(prevErrors => ({
        ...prevErrors,
        IPAddress: undefined,
        port: undefined,
      }));
    }
  };

  // Success message handler
  const handleSuccessConfirm = useCallback(() => {
    setSuccessMessage('');
    navigation.navigate('RfidReader');
  }, [navigation]);

  useEffect(() => {
    if (successMessage) {
      Alert.alert('Success', successMessage, [
        {text: 'OK', onPress: handleSuccessConfirm},
      ]);
    }
  }, [successMessage, handleSuccessConfirm]);

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
