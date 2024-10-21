/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {EditRFIDdata} from '../../reducer/RFIDList/RFIDListAction';
import {RootState} from '../../reducer/Store';

interface RFIDItem {
  id: string;
  name: string;
  model?: string;
  ip: string;
  port: number;
}

interface EditRfidReturn {
  name: string;
  model: string;
  IPAddress: string;
  port: number;
  errors: {[key: string]: string};
  Loader: boolean;
  dropdownVisible: boolean;
  smartControllerLoader: boolean;
  showIpAndPortFields: boolean; // New state to control visibility
  setName: (name: string) => void;
  setModel: (model: string) => void;
  setIPAddress: (ip: string) => void;
  setPort: (port: number) => void;
  setDropdownVisible: (visible: boolean) => void;
  handleSaveData: () => void;
  handleInputFocus: (field: keyof typeof errors) => void;
  handleModalSelect: (selectedModel: string) => void;
}

export const useEditRfid = (item: RFIDItem): EditRfidReturn => {
  const [name, setName] = useState<string>(item.name);
  const [model, setModel] = useState<string>(item.model || '');
  const [IPAddress, setIPAddress] = useState<string>(item.ip);
  const [port, setPort] = useState<number>(item.port);
  const [storedIp, setStoredIp] = useState<string>(item.ip); // Save original IP
  const [storedPort, setStoredPort] = useState<number>(item.port); // Save original Port
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [showIpAndPortFields, setShowIpAndPortFields] = useState<boolean>(
    model !== 'FX9600',
  ); // Control visibility
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const Loader = useSelector((state: RootState) => state.rfidList.loader);
  const EditError = useSelector(
    (state: RootState) => state.rfidList.errors.edit,
  );
  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const token = useSelector((state: RootState) => state.authentication.token);
  const smartControllerLoader = useSelector(
    (state: RootState) => state.genericAddDetail.smartControllerLoader,
  );

  const handleInputFocus = useCallback(
    (field: keyof typeof errors) => {
      setErrors(prevErrors => ({...prevErrors, [field]: undefined}));
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

  const handleSaveData = useCallback(async () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const rfidData = {
        name,
        model,
        id: item.id,
        ...(model !== 'FX9600' && {ip: IPAddress, port}),
      };
      // console.log(rfidData);

      await dispatch(
        EditRFIDdata({
          rfidData,
          token,
          buCode,
        }),
      ).unwrap();

      setSuccessMessage('Data saved successfully!');
    } catch (err) {
      Alert.alert('Error', err);
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
    validateInputs,
  ]);

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

  const handleModalSelect = (selectedModel: string) => {
    setModel(selectedModel.name);

    if (selectedModel.name === 'FX9600') {
      // Clear the fields and hide them
      setStoredIp(IPAddress); // Save current IP to restore later
      setStoredPort(port); // Save current Port to restore later
      setIPAddress(''); // Clear the IP address
      setPort(0); // Clear the port
      setShowIpAndPortFields(false); // Hide the fields
    } else {
      // Restore the stored IP and port and show the fields
      setIPAddress(storedIp);
      setPort(storedPort);
      setShowIpAndPortFields(true); // Show the fields
    }

    setDropdownVisible(false); // Close modal
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
    showIpAndPortFields, // Return this to control the UI in the component
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
