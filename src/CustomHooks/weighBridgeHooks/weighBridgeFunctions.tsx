import { store } from '../../reducer/Store';
import { UpdateWeighBridgeSpot, weighBridgeAdd } from '../../reducer/weighBridge/WeighBridgeAction';
import WeighBridgeEffectHooks from './WeighBridgeEffectHooks';
import { useEffect, useState } from 'react';
import { types } from '../../assets/constants/Constant';
import CustomToast from '../../reuseableComponent/modal/CustomToast';
import { resetUpadteStatus } from '../../reducer/weighBridge/WeighBridgeReducer';
import { Strings } from '../../assets/constants/Lable';

function WeighBridgeFunction(props: { id: any }) {
  const { id } = props
  const [name, setName] = useState('');
  const [delay, setDelay] = useState('');
  const [minTagCount, setMinTagCount] = useState('');
  const [securityTagTimeOut, setSecurityTagTimeOut] = useState('');
  const [driverTagTimeOut, setDriverTagTimeOut] = useState('');
  const [platformReadyTicks, setPlatformReadyTicks] = useState('');
  const [platformMaxWeight, setPlatformMaxWeight] = useState('');
  const [platformMinWeight, setPlatformMinWeight] = useState('');
  const [stableWeightTolerance, setStableWeightTolerance] = useState('');
  const [stableWeightTicks, setStableWeightTicks] = useState('');
  const [minVehicleWeight, setMinVehicleWeight] = useState('');
  const [expiryDateValue, setExpiryDateValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isActiveEnabled, setIsActiveEnabled] = useState(false);
  const [currentField, setCurrentField] = useState<string | null>(null);

  const {
    loader,
    displays,
    smartController,
    smartControllerLoader,
    weightParsers,
    WeighBridgeSpot,
    baseUrls, buCode, token, GenericSpots, readers, uploadError, dispatch, navigation, updateStatus, setLoader
  } = WeighBridgeEffectHooks({ id: id });
  const [errors, setErrors] = useState<{
    name?: string;
    delay?: string;
    event?: string;
    sequrityDelay?: string;
    direction?: string;
    weighBridge?: string;
    driverTagTimeOut?: string;
    minTagCount?: string;
    loader?: string;
    displays?: string;
    smartController?: string;
    smartControllerLoader?: string;
    weightParsers?: string;
    isCalendarVisible?: string;
    selectedDate?: string;
    selectedSecondaryReaderB?: string;
    securityTagTimeOut?: string;
    selectedEvent?: string;
    selectedSecondaryReaderA?: string;
    validIdA?: string;
    validIdB?: string;
    selectedSmartConnector?: string;
    selectedWeightParser?: string;
    platformReadyTicks?: string;
    minVehicleWeight?: string;
    platformMaxWeight?: string;
    platformMinWeight?: string;
    stableWeightTolerance?: string;
    stableWeightTicks?: string;
    isDriverTagEnabled?: string;
    isSecurityTagEnabled?: string;
    modalVisible?: string;
    selectedDisplayA?: string;
    selectedPrimaryReaderA?: string;
    selectedGenericSpotDirA?: string;
    selectedDisplayB?: string;
    selectedPrimaryReaderB?: string;
    selectedGenericSpotDirB?: string;
  }>({});
  const [selectedSmartConnector, setSelectedSmartConnector] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedEvent, setSelectedEvent] = useState<any>({ name: '', id: '' });
  const [selectedWeightParser, setselectedWeightPars] = useState<any>({
    name: '',
    id: '',
  });


  // Direction A states
  const [validIdA, setValidIdA] = useState('');
  const [selectedDisplayA, setSelectedDisplayA] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedPrimaryReaderA, setSelectedPrimaryReaderA] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedSecondaryReaderA, setSelectedSecondaryReaderA] = useState<any>(
    { name: '', id: '' },
  );

  // Direction B states
  const [validIdB, setValidIdB] = useState('');
  const [selectedDisplayB, setSelectedDisplayB] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedPrimaryReaderB, setSelectedPrimaryReaderB] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedSecondaryReaderB, setSelectedSecondaryReaderB] = useState<any>(
    { name: '', id: '' },
  );
  const [selectedGenericSpotDirA, setSelectedGenericSpotDirA] = useState<any>({
    name: '',
    id: '',
  });
  const [selectedGenericSpotDirB, setSelectedGenericSpotDirB] = useState<any>({
    name: '',
    id: '',
  });



  const [isDriverTagEnabled, setIsDriverTagEnabled] = useState(false);
  const toggleDriverTagSwitch = () =>
    setIsDriverTagEnabled(prevState => !prevState);

  const [isSecurityTagEnabled, setIsSecurityTagEnabled] = useState(false);
  const toggleSecurityTagSwitch = () =>
    setIsSecurityTagEnabled(prevState => !prevState);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const openCalendarModal = () => setCalendarVisible(true);
  const closeCalendarModal = () => setCalendarVisible(false);

  const handleDateSelect = (
    date: React.SetStateAction<string>,
    dateValue: any,
  ) => {
    setExpiryDateValue(dateValue);
    setSelectedDate(date);
    closeCalendarModal(); // Close the modal after selecting the date
  };

  const handleOptionSelect = (selected: any) => {
    switch (currentField) {
      case Strings.SMART_CONTROLLER_S:
        setSelectedSmartConnector(selected);
        break;
      case Strings.EVENTS_S:
        setSelectedEvent(selected);
        break;
      case Strings.WEIGHT_PARSER_s:
        setselectedWeightPars(selected);
        break;
      case Strings.DISPLAY_A:
        setSelectedDisplayA(selected);
        break;
      case Strings.PRIMARY_READER_A:
        setSelectedPrimaryReaderA(selected);
        break;
      case Strings.SECOUNDARY_READER_A:
        setSelectedSecondaryReaderA(selected);
        break;
      case Strings.DISPLAYB:
        setSelectedDisplayB(selected);
        break;
      case Strings.PRIMARY_READERS_B:
        setSelectedPrimaryReaderB(selected);
        break;
      case Strings.SECOUNDARY_READERS_B:
        setSelectedSecondaryReaderB(selected);
        break;
      case Strings.GENERIC_SPOT_A:
        setSelectedGenericSpotDirA(selected);
        break;
      case Strings.GENERIC_SPOT_B:
        setSelectedGenericSpotDirB(selected);
        break;
    }
    setModalVisible(false);
    setCurrentField(null);
  };

  // Function to handle input focus and show the modal with the correct options
  const handleFocus = (field: string) => {
    if (field) {
      setModalVisible(!modalVisible);
      setCurrentField(field);
    } else {
      openCalendarModal();
    }
    if (currentField?.includes(Strings.DISPLAY_s)) {
      return displays;
    } else if (currentField?.includes(Strings.READER)) {
      return readers;
    } else if (currentField?.includes(Strings.GENERIC_SPOT_s)) {
      return GenericSpots;
    }
  };

  // Get the options based on the currently focused field
  const getOptions = () => {
    if (currentField === Strings.DISPLAY_s) {
      return displays;
    } else if (currentField === Strings.SMART_CONTROLLER_S) {
      return smartController;
    } else if (currentField === Strings.EVENTS_S) {
      return types;
    } else if (currentField === Strings.WEIGHT_PARSER_s) {
      return weightParsers;
    } else if (currentField?.includes(Strings.DISPLAY_s)) {
      return displays;
    } else if (currentField?.includes(Strings.READER)) {
      return readers;
    } else if (currentField?.includes(Strings.GENERIC_SPOT_s)) {
      return GenericSpots;
    }
    return [];
  };

  const isFormValid = () => {
    return name?.trim() !== '' &&
      selectedEvent?.name?.trim() !== '' &&
      selectedSmartConnector?.name?.trim() !== '' &&
      selectedWeightParser?.name?.trim() !== '' &&
      platformReadyTicks !== '' &&
      platformMaxWeight !== null &&
      platformMinWeight !== null &&
      stableWeightTolerance !== null &&
      stableWeightTicks !== null &&
      minVehicleWeight !== null &&
      (selectedEvent.id === Strings.UNIDIRECTIONAL_WEIGHBRIDGE ||
        selectedEvent.id === Strings.UNIDIRECTIONAL_WEIGHBRIDGE_3_READER ||
        selectedEvent.id === Strings.BIDIRECTIONAL_WEIGHBRIDGE)
      ? selectedPrimaryReaderA?.name?.trim() !== ''
      : selectedEvent.id === Strings.BIDIRECTIONAL_WEIGHBRIDGE_NO_READER
        ? typeof selectedGenericSpotDirA === Strings.STRING &&
        selectedGenericSpotDirA.trim() !== '' &&
        typeof selectedGenericSpotDirB === Strings.STRING &&
        selectedGenericSpotDirB.trim() !== ''
        : selectedEvent.id === Strings.UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER
          ? typeof selectedGenericSpotDirA === Strings.STRING &&
          selectedGenericSpotDirA.trim() !== ''
          : selectedPrimaryReaderB?.name?.trim() !== '';
  };

  const handleUploadData = () => {

    const newErrors: {
      name?: string;
      delay?: string;
      event?: string;
      sequrityDelay?: string;
      direction?: string;
      weighBridge?: string;
      driverTagTimeOut?: string;
      minTagCount?: string;
      loader?: string;
      displays?: string;
      smartController?: string;
      smartControllerLoader?: string;
      weightParsers?: string;
      selectedSecondaryReaderB?: string;
      securityTagTimeOut?: string;
      selectedEvent?: string;
      selectedSecondaryReaderA?: string;
      validIdA?: string;
      validIdB?: string;
      selectedSmartConnector?: string;
      selectedWeightParser?: string;
      platformReadyTicks?: string;
      minVehicleWeight?: string;
      platformMaxWeight?: string;
      platformMinWeight?: string;
      stableWeightTolerance?: string;
      stableWeightTicks?: string;
      isDriverTagEnabled?: string;
      isSecurityTagEnabled?: string;
      modalVisible?: string;
      selectedDisplayA?: string;
      selectedPrimaryReaderA?: string;
      selectedGenericSpotDirA?: string;
      selectedDisplayB?: string;
      selectedPrimaryReaderB?: string;
      selectedGenericSpotDirB?: string;
    } = {};
    // // Adding validation for each field
    // if (!selectedEvent?.id) {
    //   newErrors.event = 'Event is required';
    // }
    // if (!name) {
    //   newErrors.name = 'Name is required';
    // }
    // if (!delay) {
    //   newErrors.delay = 'Delay is required';
    // }
    // if (isDriverTagEnabled && !driverTagTimeOut) {
    //   newErrors.driverTagTimeOut = 'Driver Tag Timeout is required';
    // }
    // if (isSecurityTagEnabled && !securityTagTimeOut) {
    //   newErrors.sequrityDelay = 'Security Delay is required';
    // }

    // if (!selectedSmartConnector.id) {
    //   newErrors.selectedSmartConnector = 'Smart Connector is required';
    // }
    // if (!selectedWeightParser.id) {
    //   newErrors.selectedWeightParser = 'Weight Parser is required';
    // }
    // if (!platformReadyTicks) {
    //   newErrors.platformReadyTicks = 'Platform Ready Ticks is required';
    // }
    // if (!minVehicleWeight) {
    //   newErrors.minVehicleWeight = 'Minimum Vehicle Weight is required';
    // }
    // if (!platformMaxWeight) {
    //   newErrors.platformMaxWeight = 'Platform Max Weight is required';
    // }
    // if (!platformMinWeight) {
    //   newErrors.platformMinWeight = 'Platform Min Weight is required';
    // }
    // if (!stableWeightTolerance) {
    //   newErrors.stableWeightTolerance = 'Stable Weight Tolerance is required';
    // }
    // if (!stableWeightTicks) {
    //   newErrors.stableWeightTicks = 'Stable Weight Ticks is required';
    // }
    // if (platformMinWeight >= platformMaxWeight) {
    //   newErrors.platformMinWeight = "Platform min weight is always less than Platform Max weight"
    // }
    // if (
    //   platformMaxWeight >= minVehicleWeight
    // ) {
    //   newErrors.minVehicleWeight = "minVehicleWeight is  always more than Platform Max weight"
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    let typeSpecificFields = {};
    switch (selectedEvent.id) {
      case Strings.UNIDIRECTIONAL_WEIGHBRIDGE:
        typeSpecificFields = {
          validDiDirA: validIdA,
          primaryReaderIdDirA: Number(selectedPrimaryReaderA.id),
          ...(displayAId && { displayIdDirA: Number(selectedDisplayA.id) })
        };
        break;

      case Strings.BIDIRECTIONAL_WEIGHBRIDGE:
        typeSpecificFields = {
          primaryReaderIdDirB: Number(selectedPrimaryReaderB.id),
          validDiDirA: validIdA,
          primaryReaderIdDirA: Number(selectedPrimaryReaderA.id),
          validDiDirB: validIdB,
          ...(displayAId && { displayIdDirA: Number(selectedDisplayA.id) }),
          ...(displayBId && { displayIdDirB: Number(selectedDisplayB.id) })

        };
        break;
      case Strings.BIDIRECTIONAL_WEIGHBRIDGE_NO_READER:
        typeSpecificFields = {
          validDiDirA: validIdA,
          primaryReaderIdDirA: Number(selectedPrimaryReaderA.id),
          ...(displayAId && { displayIdDirA: Number(selectedDisplayA.id) })
        };
        break;

      case Strings.UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER:
        typeSpecificFields = {
          validDiDirA: validIdA,
          ...(displayAId && { displayIdDirA: Number(selectedDisplayA.id) })
        };
        break;

      case Strings.BIDIRECTIONAL_WEIGHBRIDGE_NO_READER:
        typeSpecificFields = {
          validDiDirA: validIdA,
          validDiDirB: validIdB,
          ...(displayAId && { displayIdDirA: Number(selectedDisplayA.id) }),

          ...(displayBId && { displayIdDirB: Number(selectedDisplayB.id) })

        };
        break;
    }
    const input = {
      active: isActiveEnabled,
      ...(WeighBridgeSpot?.id && { id: WeighBridgeSpot.id }),
      buCode: buCode,
      delayAlertAfter: delay ? Number(delay) : null,
      driverTag: isDriverTagEnabled,
      expiryDate: expiryDateValue ? expiryDateValue : null,
      maxPlatformReadyWeight: Number(platformMaxWeight),
      minPlatformReadyWeight: Number(platformMinWeight),
      minVehicleWeight: Number(minVehicleWeight),
      name: name,
      securityTag: isSecurityTagEnabled,
      smartioId: selectedSmartConnector.id,
      stableWeightTolerance: stableWeightTolerance,
      tagCount: Number(minTagCount),
      ticksForPlatformReady: Number(platformReadyTicks),
      ticksForStableWeight: Number(stableWeightTicks),
      type: selectedEvent.id,
      weightParserId: Number(selectedWeightParser.id),
      genericSpotDirA: Number(selectedGenericSpotDirA.id) || null,
      genericSpotDirB: Number(selectedGenericSpotDirB.id) || null,
    };
    const dataToUpload = {
      ...typeSpecificFields,
      ...input,
    };
    try {
      store.dispatch(
        id ?
          UpdateWeighBridgeSpot({
            baseUrls: baseUrls,
            weighData: dataToUpload,
            token: token,
            buCode: buCode,
          }) :
          weighBridgeAdd({
            baseUrls: baseUrls,
            weighData: dataToUpload,
            token: token,
            buCode: buCode,
          })

      );
    } catch (error) {
    }

  }
  //type
  const eventFromApi = WeighBridgeSpot.type;
  const matchedEvent = types.find(event => event.id === eventFromApi);
  //genericA
  const GenericSpotA = WeighBridgeSpot.genericSpotDirA;
  const GenericSpotDirA = GenericSpots.find(spot => spot.id === GenericSpotA);
  //GenericB
  const GenericSpotB = WeighBridgeSpot.genericSpotDirB;
  const GenericSpotDirB = GenericSpots.find(spot => spot.id === GenericSpotB);
  //smartIo
  const smartControllerOfSpot = WeighBridgeSpot.smartio;
  const smartControllerName = smartControllerOfSpot?.name;
  const smartControllerId = smartControllerOfSpot?.id;
  //primaryReaders
  const ReaderOfSpot = WeighBridgeSpot.readers;
  const primaryReaderA = ReaderOfSpot?.find((item: { type: string, direction: string }) => item.type === Strings.PRIMARY && item.direction === Strings.A);
  const primaryReaderB = ReaderOfSpot?.find((item: { type: string, direction: string }) => item.type === Strings.PRIMARY && item.direction === Strings.B);
  const PrimaryReaderAName = primaryReaderA?.name;
  const PrimaryReaderAId = primaryReaderA?.id;
  const PrimaryReaderBName = primaryReaderB?.name;
  const PrimaryReaderBId = primaryReaderB?.id;

  //secoundaryReader
  const secoundaryReaderA = ReaderOfSpot?.find((item: { type: string, direction: string }) => item.type === Strings.SECONDARY && item.direction === Strings.A);
  const secoundaryReaderB = ReaderOfSpot?.find((item: { type: string, direction: string }) => item.type === Strings.SECONDARY && item.direction === Strings.B);
  const secoundaryReaderAName = secoundaryReaderA?.name;
  const secoundaryReaderAId = secoundaryReaderA?.id;
  const secoundaryReaderBName = secoundaryReaderB?.name;
  const secoundaryReaderBId = secoundaryReaderB?.id;

  //displays
  const displayOfSpot = WeighBridgeSpot.displays

  const displayA = displayOfSpot?.find((item: { direction: string }) => item.direction === Strings.A);
  const displayB = displayOfSpot?.find((item: { direction: string }) => item.direction === Strings.B);
  const displayAName = displayA?.name;
  const displayAId = displayA?.id;
  const displayBName = displayB?.name;
  const displayBId = displayB?.id;
  useEffect(() => {
    if (id) {
      setName(WeighBridgeSpot.name)
      setDelay(WeighBridgeSpot.delayAlertAfter?.toString() || '')
      setValidIdA(WeighBridgeSpot.validDiDirA?.toString() || '')
      setValidIdB(WeighBridgeSpot.validDiDirB?.toString() || '')
      setSelectedEvent({ name: matchedEvent?.name || '', id: matchedEvent?.id || '' })
      setSelectedSmartConnector({ name: smartControllerName || '', id: smartControllerId || "" })
      setPlatformMaxWeight(WeighBridgeSpot.maxPlatformReadyWeight?.toString() || '')
      setPlatformMinWeight(WeighBridgeSpot.minPlatformReadyWeight?.toString() || '')
      setMinTagCount(WeighBridgeSpot.tagCount?.toString() || "")
      setMinVehicleWeight(WeighBridgeSpot.minVehicleWeight?.toString() || '')
      setStableWeightTicks(WeighBridgeSpot.ticksForStableWeight?.toString() || '')
      setStableWeightTolerance(WeighBridgeSpot.stableWeightTolerance?.toString() || '')
      setPlatformReadyTicks(WeighBridgeSpot.ticksForPlatformReady?.toString() || '')
      setSelectedGenericSpotDirA({ name: GenericSpotDirA?.name || '', id: GenericSpotDirA?.id || '' })
      setSelectedGenericSpotDirB({ name: GenericSpotDirB?.name || '', id: GenericSpotDirB?.id || '' })
      setSelectedPrimaryReaderA({ name: PrimaryReaderAName || '', id: PrimaryReaderAId || '' })
      setSelectedPrimaryReaderB({ name: PrimaryReaderBName || '', id: PrimaryReaderBId || '' })
      setSelectedSecondaryReaderA({ name: secoundaryReaderAName || '', id: secoundaryReaderAId || '' })
      setSelectedSecondaryReaderB({ name: secoundaryReaderBName || '', id: secoundaryReaderBId || '' })
      setSelectedDisplayA({ name: displayAName || '', id: displayAId || '' })
      setSelectedDisplayB({ name: displayBName || '', id: displayBId || '' })
      if (WeighBridgeSpot && WeighBridgeSpot.smartio && WeighBridgeSpot.smartio.psr) {
        const psrId = WeighBridgeSpot.smartio.psr.id;
        const psrName = WeighBridgeSpot.smartio.psr.name;
        setselectedWeightPars({ name: psrName || '', id: psrId || '' })
      }
      setDriverTagTimeOut(WeighBridgeSpot.driverTagTimeout?.toString() || '')
      setSecurityTagTimeOut(WeighBridgeSpot.driverTagTimeout?.toString() || '')
      setIsDriverTagEnabled(WeighBridgeSpot.driverTag)
      setIsSecurityTagEnabled(WeighBridgeSpot.securityTag)
      setIsActiveEnabled(WeighBridgeSpot.active)
    }
  }, [id, WeighBridgeSpot])
  useEffect(() => {
    switch (updateStatus) {
      case 'failed':
        CustomToast(Strings.ERROR_s, uploadError);
        dispatch(resetUpadteStatus());
        break;
      case 'succeeded':
        CustomToast(Strings.SUCCESS_s, updateStatus);
        dispatch(resetUpadteStatus());
        navigation.navigate('WeighbridgesScreen');
        break;
      case 'loading':
        setLoader(true);
        break;
    }
  }, [uploadError, dispatch, navigation, updateStatus]);
  return {
    name,
    delay,
    minTagCount,
    loader,
    displays,
    smartController,
    smartControllerLoader,
    weightParsers,
    isCalendarVisible,
    selectedDate,
    selectedSecondaryReaderB,
    securityTagTimeOut,
    selectedEvent,
    selectedSecondaryReaderA,
    validIdA,
    validIdB,
    driverTagTimeOut,
    selectedSmartConnector,
    selectedWeightParser,
    platformReadyTicks,
    minVehicleWeight,
    platformMaxWeight,
    platformMinWeight,
    stableWeightTolerance,
    stableWeightTicks,
    isDriverTagEnabled,
    isSecurityTagEnabled,
    modalVisible,
    selectedDisplayA,
    selectedPrimaryReaderA,
    selectedGenericSpotDirA,
    selectedDisplayB,
    selectedPrimaryReaderB,
    selectedGenericSpotDirB,
    errors,
    getOptions,
    setMinTagCount,
    handleUploadData,
    setName,
    isFormValid,
    setDelay,
    handleFocus,
    toggleDriverTagSwitch,
    handleDateSelect,
    handleOptionSelect,
    toggleSecurityTagSwitch,
    setCalendarVisible,
    setSelectedDate,
    setSecurityTagTimeOut,
    setSelectedSecondaryReaderB,
    setSelectedSecondaryReaderA,
    setValidIdB,
    setValidIdA,
    setDriverTagTimeOut,
    setPlatformReadyTicks,
    setPlatformMaxWeight,
    setPlatformMinWeight,
    setStableWeightTolerance,
    setStableWeightTicks,
    setMinVehicleWeight,
    closeCalendarModal,
    setModalVisible,
  };
}
export default WeighBridgeFunction;
