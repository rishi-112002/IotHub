import { useCallback, useEffect, useState } from 'react';
import { direction, events } from '../../assets/constants/Constant';
import { store } from '../../reducer/Store';
import { UpdateGenericSpot, uploadGenericData } from '../../reducer/genericSpot/uploadGenericDataAction';
import { useGenericAddEffect } from './GenericAddEffect';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import { resetUpadteStatus } from '../../reducer/genericSpot/uploadGenericDataReducer';
import { weighBridges } from '../../api/EndPointsUrl';

function GenericAddFunction(props: { id: any }) {
  const { id } = props


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
    GenericSpot,
    navigation,
    updateStatus,
    setLoader,
    dispatch,
    editButtonOpacity,
    setEditButtonOpacity

  } = useGenericAddEffect(id);

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
    { name: '', id: '' },
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

  const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
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
  const handleInputChange = (name: any, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

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
  // Assuming this is the event id from the API response
  const smartControllerOfSpot = GenericSpot.smartio;

  const smartControllerName = smartControllerOfSpot?.name;
  const smartControllerId = smartControllerOfSpot?.id;
  const displayOfSpot = GenericSpot.displays;

  const displayName = displayOfSpot?.[0]?.name;
  const displayId = displayOfSpot?.[0]?.id;
  // Find the event object with a matching id
  // const matchedprimaryReader = smartController.find(smartio => smartio.id === smartControllerOfSpot)
  const eventFromApi = GenericSpot.events;
  const matchedEvent = events.find(event => event.id === eventFromApi);
  const primaryReaderOfSpot = GenericSpot.readers;

  // Filter primary and secondary readers
  const primaryReader = primaryReaderOfSpot?.find((item: { type: string }) => item.type === "PRIMARY");
  const secondaryReader = primaryReaderOfSpot?.find((item: { type: string }) => item.type === "SECONDARY");

  // Extracting the properties for primary and secondary readers
  const PrimaryReaderName = primaryReader?.name;
  const PrimaryReaderId = primaryReader?.id;

  const SecondaryReaderName = secondaryReader?.name;
  const SecondaryReaderId = secondaryReader?.id;
  useEffect(() => {
    if (id) {
      setFormData({
        name: GenericSpot.name || '',
        delay: GenericSpot.delayAlertAfter?.toString() || '',
        validId: GenericSpot.validDiDirA || '',
        driverTagTimeOut: GenericSpot.driverTagTimeout?.toString() || '',
        sequrityTagTimeOut: GenericSpot.securityTagTimeout?.toString() || '',
        minTagCount: GenericSpot.tagCount?.toString() || '',
      });
      setSelectedDisplay({ name: displayName ? displayName : '', id: displayId ? displayId : '' })
      setSelectedEvent({ name: matchedEvent?.name || '', id: matchedEvent?.id || '' });
      setSelectedDirection({ name: GenericSpot.weighbridgeDirection || '', id: GenericSpot.weighbridgeDirection });
      setSelectedWeighBridge({ name: GenericSpot.weighbridgeName || '', id: GenericSpot.weighbridgeId });
      setSelectedSmartConnector({ name: smartControllerName ? smartControllerName : '', id: smartControllerId ? smartControllerId : '' });
      setSelectedPrimaryReader({ name: PrimaryReaderName ? PrimaryReaderName : '', id: PrimaryReaderId ? PrimaryReaderId : '' });
      setSelectedSecoundaryReader({ name: SecondaryReaderName ? SecondaryReaderName : '', id: SecondaryReaderId ? SecondaryReaderId : '' });
      setIsDriverTagEnabled(GenericSpot.driverTag || false);
      setIsSecurityTagEnabled(GenericSpot.securityTag || false);
      setIsWeightBridgeEntryEnabled(GenericSpot.weighbridgeEntry || false);
      setIsActiveEnabled(GenericSpot.active || false);
    }
  }, [GenericSpot]);
  useEffect(() => {
    switch (updateStatus) {
      case 'failed':
        CustomToast('error', uploadError);
        dispatch(resetUpadteStatus());
        break;
      case 'succeeded':
        CustomToast('success', updateStatus);
        dispatch(resetUpadteStatus());
        navigation.navigate('GenericSpotScreen');
        break;
      case 'loading':
        setLoader(true);
        break;
    }
  }, [uploadError, dispatch, navigation, updateStatus]);
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
  const newErrors: {
    name?: string;
    delay?: string;
    event?: string;
    sequrityDelay?: string;
    direction?: string;
    weighBridge?: string;
    driverTagTimeOut?: string;
  } = {};
  const handleNameChange = (input: string) => {
    const newValue = input;
    if (input !== newValue) {
      setErrors((prev: any) => ({ ...prev, name: "" }));
    } else {
      setErrors((prev: any) => ({ ...prev, name: undefined }));
    }
    handleInputChange('name', newValue);
  }
  const handleDelayChange = (input: string) => {
    const newValue = input.replace(/\s/g, '');
    if (input !== newValue) {
      setErrors((prev: any) => ({ ...prev, delay: 'space is not allowed' }));
    } else {
      setErrors((prev: any) => ({ ...prev, delay: undefined }));
    }
    handleInputChange('delay', newValue);
  }
  const handleEventChange = (input: string) => {
    const newValue = input.replace(/\s/g, '');
    if (input !== newValue) {
      setErrors((prev: any) => ({ ...prev, delay: 'space is not allowed' }));
    } else {
      setErrors((prev: any) => ({ ...prev, delay: undefined }));
    }
    handleInputChange('delay', newValue);
  }
  const handleSaveData = useCallback(() => {

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
      ...((selectedEvent.id === 'TAG_ENTRY' || selectedEvent.id === 'TAG_ENTRY_AND_EXIT') && selectedPrimaryReader.id && { primaryReaderIdDirA: selectedPrimaryReader.id }),
      ...((selectedEvent.id === 'TAG_ENTRY' || selectedEvent.id === 'TAG_ENTRY_AND_EXIT') && selectedSecoundaryReader.id && { secondaryReaderIdDirA: selectedSecoundaryReader.id }),
      ...(GenericSpot?.id && { id: GenericSpot.id }),
      delayAlertAfter: Number(formData.delay),
      driverTag: isDriverTagEnabled,
      ...(isDriverTagEnabled && { driverTagTimeout: Number(formData.driverTagTimeOut) }),
      events: selectedEvent.id ? selectedEvent.id : null,
      name: formData.name,
      ...(formData.validId && { validDiDirA: formData.validId }),
      securityTag: isSecurityTagEnabled,
      ...(isSecurityTagEnabled && {
        securityTagTimeout: Number(formData.sequrityTagTimeOut),
      }),

      tagCount: formData.minTagCount ? Number(formData.minTagCount) : null,
      type: 'GENERIC_SPOT',
      weighbridgeDirection: isWeightBridgeEntryEnabled
        && selectedDirection.id
        ? selectedDirection.id
        : null,
      ...(selectedSmartConnector.id && { smartioId: selectedSmartConnector.id, }),
      ...(selectedDisplay.id && { displayIdDirA: selectedDisplay.id, }),
      weighbridgeEntry: isWeightBridgeEntryEnabled,
      weighbridgeId: isWeightBridgeEntryEnabled
        && selectedWeighBridge.id
        ? selectedWeighBridge.id
        : null
    };
    try {
      store.dispatch(
        id
          ? UpdateGenericSpot({
            baseUrls: baseUrls,
            genericData: dataToSave,
            token: token,
            buCode: buCode,
          })
          : uploadGenericData({
            baseUrls: baseUrls,
            genericData: dataToSave,
            token: token,
            buCode: buCode,
          })
      );
    } catch (error) {
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

  useEffect(() => {
    if (id) {
      const isFormDataMatching =
        formData.name === GenericSpot.name &&
        formData.delay === (GenericSpot.delayAlertAfter?.toString() || "") &&
        formData.validId === (GenericSpot.validDiDirA || '') &&
        formData.driverTagTimeOut === (GenericSpot.driverTagTimeout?.toString() || "") &&
        formData.sequrityTagTimeOut === (GenericSpot.securityTagTimeout?.toString() || "") &&
        formData.minTagCount === (GenericSpot.tagCount?.toString() || "")
        &&
        isActiveEnabled === GenericSpot.active &&
        selectedDisplay.id === (displayId || null) &&
        selectedEvent.id === (matchedEvent?.id || null) &&
        selectedPrimaryReader.id === (PrimaryReaderId || null) &&
        selectedSecoundaryReader.id === (SecondaryReaderId || null)
        &&
        isDriverTagEnabled === GenericSpot.driverTag &&
        isSecurityTagEnabled === GenericSpot.securityTag
        ;

      if (isFormDataMatching) {
        setEditButtonOpacity(true);
      } else {
        setEditButtonOpacity(false);
      }
    }
  }, [id, formData, GenericSpot]);


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
    editButtonOpacity,
    handleNameChange,
    handleDelayChange,
  };
}
export default GenericAddFunction;

