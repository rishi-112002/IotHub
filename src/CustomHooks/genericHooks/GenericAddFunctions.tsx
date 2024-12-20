import { useCallback, useEffect, useState } from 'react';
import { direction, events } from '../../assets/constants/Constant';
import { store } from '../../reducer/Store';
import { UpdateGenericSpot, uploadGenericData } from '../../reducer/genericSpot/uploadGenericDataAction';
import { useGenericAddEffect } from './GenericAddEffect';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import { resetUpadteStatus } from '../../reducer/genericSpot/uploadGenericDataReducer';
import { weighBridges } from '../../api/EndPointsUrl';
import { Strings } from '../../assets/constants/Lable';

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
  const eventFromApi = GenericSpot.events;
  const matchedEvent = events.find(event => event.id === eventFromApi);
  const primaryReaderOfSpot = GenericSpot.readers;

  // Filter primary and secondary readers
  const primaryReader = primaryReaderOfSpot?.find((item: { type: string }) => item.type === Strings.PRIMARY);
  const secondaryReader = primaryReaderOfSpot?.find((item: { type: string }) => item.type === Strings.SECONDARY);

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
        CustomToast(Strings.ERROR_s, uploadError);
        dispatch(resetUpadteStatus());
        break;
      case 'succeeded':
        CustomToast(Strings.SUCCESS_s, updateStatus);
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
        case Strings.DISPLAY_s:
          setSelectedDisplay(selected);
          break;
        case Strings.PRIMARY_READERS_S:
          setSelectedPrimaryReader(selected);
          break;
        case Strings.SECOUNDARY_READERS_s:
          setSelectedSecoundaryReader(selected);
          break;
        case Strings.SMART_CONTROLLER_S:
          setSelectedSmartConnector(selected);
          break;
        case Strings.EVENTS_S:
          setSelectedEvent(selected);
          break;
        case Strings.WEIGHBRIDGE_S:
          setSelectedWeighBridge(selected);
          break;
        case Strings.DIRECTION_s:
          setSelectedDirection(selected);
          break;
      }
      setModalVisible(false);
      setCurrentField(null);
    },
    [currentField],
  );
  const getOptions = () => {
    if (currentField === Strings.DISPLAY_s) {
      return displays;
    } else if (currentField === Strings.SECOUNDARY_READERS_s) {
      return readers;
    } else if (currentField === Strings.PRIMARY_READERS_S) {
      return readers;
    } else if (currentField === Strings.SMART_CONTROLLER_S) {
      return smartController;
    } else if (currentField === Strings.EVENTS_S) {
      return events;
    } else if (currentField === Strings.WEIGHBRIDGE_S) {
      return Weightbridge;
    } else if (currentField === Strings.DIRECTION_s) {
      return direction;
    }

    return [];
  };

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
    handleInputChange(Strings.NAME_s, newValue);
  }
  const handleDelayChange = (input: string) => {
    const newValue = input.replace(/\s/g, '');
    if (input !== newValue) {
      setErrors((prev: any) => ({ ...prev, delay: Strings.SPACE_NOT_ALLOWED }));
    } else {
      setErrors((prev: any) => ({ ...prev, delay: undefined }));
    }
    handleInputChange(Strings.DELAY_s, newValue);
  }
  const handleSaveData = useCallback(() => {

    if (!selectedEvent.id) {
      newErrors.event = Strings.EVENT_IS_REQUIRED;
    }
    if (!formData.name) {
      newErrors.name = Strings.NAME_IS_REQUIRED;
    }
    if (!formData.delay) {
      newErrors.delay = Strings.DELAY_IS_REQUIRED;
    }
    if (isDriverTagEnabled && !formData.driverTagTimeOut) {
      newErrors.driverTagTimeOut = Strings.DRIVER_TAG_TIMEOUT_IS_REQUIRED;
    }
    if (isSecurityTagEnabled && !formData.sequrityTagTimeOut) {
      newErrors.sequrityDelay = Strings.SECURITY_DELAY_IS_REQUIRED;
    }
    if (isWeightBridgeEntryEnabled) {
      if (!selectedDirection) {
        newErrors.direction = Strings.DIRECTION_IS_REQUIRED;
      }
      if (!selectedWeighBridge) {
        newErrors.weighBridge = Strings.WEIGHBRIDGE_IS_REQUIRED;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSave = {
      active: isActiveEnabled,
      buCode: buCode,
      ...((selectedEvent.id === Strings.TAG_ENTRY || selectedEvent.id === Strings.TAG_ENTRY_AND_EXIT) && selectedPrimaryReader.id && { primaryReaderIdDirA: selectedPrimaryReader.id }),
      ...((selectedEvent.id === Strings.TAG_ENTRY || selectedEvent.id === Strings.TAG_ENTRY_AND_EXIT) && selectedSecoundaryReader.id && { secondaryReaderIdDirA: selectedSecoundaryReader.id }),
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
      type: Strings.GENERIC_SPOT,
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

