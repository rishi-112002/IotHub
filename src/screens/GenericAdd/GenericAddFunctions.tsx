import {useCallback, useState} from 'react';
import {direction, events} from '../../assets/constants/Constant';
import {store} from '../../reducer/Store';
import {uploadGenericData} from '../../reducer/genericSpot/uploadGenericDataAction';
import {useGenericAddEffect} from './GenericAddEffect';

function GenericAddFunction() {
  const {
    loader,
    readerLoader,
    buCode,
    token,
    smartControllerLoader,
    displayLoader,
    baseUrls,
    uploadError,
    smartController,
    displays,
    readers,
    Weightbridge,
  } = useGenericAddEffect();
  const [formData, setFormData] = useState({
    name: '',
    delay: '',
    validId: '',
    driverTagTimeOut: '',
    sequrityTagTimeOut: '',
    minTagCount: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [currentField, setCurrentField] = useState<string | null>(null);
  const [selectedSecoundaryReader, setSelectedSecoundaryReader] = useState<any>(
    {name: '', id: ''},
  );
  const [selectedPrimaryReader, setSelectedPrimaryReader] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedDisplay, setSelectedDisplay] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedEvent, setSelectedEvent] = useState<any>({name: '', id: ''});
  const [selectedWeighBridge, setSelectedWeighBridge] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedDirection, setSelectedDirection] = useState<any>({
    name: '',
    id: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    delay?: string;
    event?: string;
    sequrityDelay?: string;
    direction?: string;
    weighBridge?: string;
    driverTagTimeOut?: string;
  }>({});

  const [isDriverTagEnabled, setIsDriverTagEnabled] = useState(false);
  const toggleDriverTagSwitch = () =>
    setIsDriverTagEnabled(prevState => !prevState);

  const [isSecurityTagEnabled, setIsSecurityTagEnabled] = useState(false);
  const toggleSecurityTagSwitch = () =>
    setIsSecurityTagEnabled(prevState => !prevState);

  const [isWeightBridgeEntryEnabled, setIsWeightBridgeEntryEnabled] =
    useState(false);
  const toggleWeightBridgeEntrySwitch = () =>
    setIsWeightBridgeEntryEnabled(prevState => !prevState);

  const [isActiveEnabled, setIsActiveEnabled] = useState(false);
  const toggleActiveSwitch = () => setIsActiveEnabled(prevState => !prevState);
  const handleOptionSelect = useCallback(
    (selected: any) => {
      switch (currentField) {
        case 'display':
          setSelectedDisplay(selected);
          break;
        case 'primaryReader':
          setSelectedPrimaryReader(selected);
          break;
        case 'secoundaryReader':
          setSelectedSecoundaryReader(selected);
          break;
        case 'smartController':
          setSelectedSmartConnector(selected);
          break;
        case 'events':
          setSelectedEvent(selected);
          break;
        case 'weightbridge':
          setSelectedWeighBridge(selected);
          break;
        case 'direction':
          setSelectedDirection(selected);
          break;
      }
      setModalVisible(false);
      setCurrentField(null);
    },
    [currentField],
  );

  // Function to handle input focus and show the modal with the correct options
  const handleFocus = useCallback((field: string) => {
    setCurrentField(field);
    setModalVisible(true);
  }, []);
  const handleSaveData = useCallback(() => {
    const newErrors: {
      name?: string;
      delay?: string;
      event?: string;
      sequrityDelay?: string;
      direction?: string;
      weighBridge?: string;
      driverTagTimeOut?: string;
    } = {};

    if (!selectedEvent.id) {
      newErrors.event = 'Event is required';
    }
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.delay) {
      newErrors.delay = 'Delay is required';
    }
    if (isDriverTagEnabled && !formData.driverTagTimeOut) {
      newErrors.driverTagTimeOut = 'Driver Tag TimeOut is required';
    }
    if (isSecurityTagEnabled && !formData.sequrityTagTimeOut) {
      newErrors.sequrityDelay = 'Sequrity Delay is required';
    }
    if (isWeightBridgeEntryEnabled) {
      if (!selectedDirection) {
        newErrors.direction = 'Direction is required';
      }
      if (!selectedWeighBridge) {
        newErrors.weighBridge = 'WeighBridge is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSave = {
      active: isActiveEnabled,
      buCode: buCode,
      delayAlertAfter: formData.delay,
      driverTag: isDriverTagEnabled,
      ...(isDriverTagEnabled && {driverTagTimeOut: formData.driverTagTimeOut}),
      events: selectedEvent.id ? selectedEvent.id : null,
      name: formData.name,
      securityTag: isSecurityTagEnabled,
      ...(isSecurityTagEnabled && {
        sequrityTagTimeOut: formData.sequrityTagTimeOut,
      }),
      tagCount: formData.minTagCount ? formData.minTagCount : null,
      type: 'GENERIC_SPOT',
      weighbridgeDirection: isWeightBridgeEntryEnabled
        ? selectedDirection.id
          ? selectedDirection.id
          : null
        : null,
      weighbridgeEntry: isWeightBridgeEntryEnabled,
      weighbridgeId: isWeightBridgeEntryEnabled
        ? selectedWeighBridge.id
          ? selectedWeighBridge.id
          : null
        : null,
    };
    console.log('data for save ', dataToSave);

    try {
      store.dispatch(
        uploadGenericData({
          baseUrls: baseUrls,
          genericData: dataToSave,
          token: token,
          buCode: buCode,
        }),
      );
    } catch (error) {
      console.log('uploadError in Generic add screen', uploadError);
    }
  }, [
    formData.name,
    formData.delay,
    isDriverTagEnabled,
    formData.driverTagTimeOut,
    isSecurityTagEnabled,
    formData.sequrityTagTimeOut,
    selectedEvent,
    selectedDirection,
    selectedWeighBridge,
    isActiveEnabled,
    formData.minTagCount,
    buCode,
    baseUrls,
    token,
    isWeightBridgeEntryEnabled,
    uploadError,
  ]);


  const getOptions = () => {
    if (currentField === 'display') {
      return displays;
    } else if (currentField === 'secoundaryReader') {
      return readers;
    } else if (currentField === 'primaryReader') {
      return readers;
    } else if (currentField === 'smartController') {
      return smartController;
    } else if (currentField === 'events') {
      return events;
    } else if (currentField === 'weightbridge') {
      return Weightbridge;
    } else if (currentField === 'direction') {
      return direction;
    }

    return [];
  };
  console.log('current filed ', currentField);
  const handleInputChange = (name: any, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  return {
    smartControllerLoader,
    displayLoader,
    readerLoader,
    formData,
    selectedSmartConnector,
    selectedDisplay,
    selectedEvent,
    selectedPrimaryReader,
    selectedSecoundaryReader,
    errors,
    isActiveEnabled,
    toggleActiveSwitch,
    handleInputChange,
    setCurrentField,
    setModalVisible,
    handleSaveData,
    getOptions,
    handleOptionSelect,
    isWeightBridgeEntryEnabled,
    isDriverTagEnabled,
    modalVisible,
    selectedDirection,
    selectedWeighBridge,
    isSecurityTagEnabled,
    toggleSecurityTagSwitch,
    toggleDriverTagSwitch,
    toggleWeightBridgeEntrySwitch,
    handleFocus,
    loader,
  };
}
export default GenericAddFunction;
