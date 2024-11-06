import { Alert } from 'react-native';
import { RootState, store } from '../../reducer/Store';
import { weighBridgeAdd } from '../../reducer/weighBridge/WeighBridgeAction';
import WeighBridgeEffectHooks from './WeighBridgeEffectHooks';
import { types } from '../../assets/constants/Constant';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function WeighBridgeFunction(props: { id: any }) {
  const { id } = props
  const [name, setName] = useState('');
  const [delay, setDelay] = useState('');
  const [minTagCount, setMinTagCount] = useState('');
  const [securityTagTimeOut, setSecurityTagTimeOut] = useState('');
  const [driverTagTimeOut, setDriverTagTimeOut] = useState('');
  const [platformReadyTicks, setPlatformReadyTicks] = useState();
  const [platformMaxWeight, setPlatformMaxWeight] = useState(0);
  const [platformMinWeight, setPlatformMinWeight] = useState();
  const [stableWeightTolerance, setStableWeightTolerance] = useState();
  const [stableWeightTicks, setStableWeightTicks] = useState();
  const [minVehicleWeight, setMinVehicleWeight] = useState(0);
  const [expiryDateValue, setExpiryDateValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<string | null>(null);

  const {
    loader,
    displays,
    smartController,
    smartControllerLoader,
    weightParsers,
  } = WeighBridgeEffectHooks({id:id});
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
  const GenericSpots = useSelector(
    (state: RootState) => state.weighBridge.genericData,
  );
  const readers = useSelector((state: RootState) => state.spotAddDetail.reader);

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

  const buCode = useSelector((state: RootState) => state.authentication.buCode);
  const baseUrls = useSelector(
    (state: RootState) => state.authentication.baseUrl,
  );
  const token = useSelector((state: RootState) => state.authentication.token);

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
    console.log('date', date, dateValue);
    setExpiryDateValue(dateValue);
    setSelectedDate(date);
    closeCalendarModal(); // Close the modal after selecting the date
  };

  const handleOptionSelect = (selected: any) => {
    switch (currentField) {
      case 'smartController':
        setSelectedSmartConnector(selected);
        break;
      case 'events':
        setSelectedEvent(selected);
        break;
      case 'weightParsers':
        setselectedWeightPars(selected);
        break;
      case 'displayA':
        setSelectedDisplayA(selected);
        break;
      case 'primaryReaderA':
        setSelectedPrimaryReaderA(selected);
        break;
      case 'secondaryReaderA':
        setSelectedSecondaryReaderA(selected);
        break;
      case 'displayB':
        setSelectedDisplayB(selected);
        break;
      case 'primaryReaderB':
        setSelectedPrimaryReaderB(selected);
        break;
      case 'secondaryReaderB':
        setSelectedSecondaryReaderB(selected);
        break;
      case 'genericSpotA':
        setSelectedGenericSpotDirA(selected);
        break;
      case 'genericSpotB':
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
      console.log('filed', field);
      openCalendarModal();
    }
    if (currentField?.includes('display')) {
      return displays;
    } else if (currentField?.includes('Reader')) {
      return readers;
    } else if (currentField?.includes('genericSpot')) {
      return GenericSpots;
    }
  };

  // Get the options based on the currently focused field
  const getOptions = () => {
    if (currentField === 'display') {
      return displays;
    } else if (currentField === 'smartController') {
      return smartController;
    } else if (currentField === 'events') {
      return types;
    } else if (currentField === 'weightParsers') {
      return weightParsers;
    } else if (currentField?.includes('display')) {
      return displays;
    } else if (currentField?.includes('Reader')) {
      return readers;
    } else if (currentField?.includes('genericSpot')) {
      return GenericSpots;
    }
    return [];
  };
  const isFormValid = () => {
    return name?.trim() !== '' &&
      delay?.trim() !== '' &&
      selectedEvent?.name?.trim() !== '' &&
      selectedSmartConnector?.name?.trim() !== '' &&
      selectedWeightParser?.name?.trim() !== '' &&
      platformReadyTicks !== '' &&
      platformMaxWeight !== null &&
      platformMinWeight !== null &&
      stableWeightTolerance !== null &&
      stableWeightTicks !== null &&
      minVehicleWeight !== null &&
      (selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE' ||
        selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER' ||
        selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE')
      ? selectedPrimaryReaderA?.name?.trim() !== ''
      : selectedEvent.id === 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER'
        ? typeof selectedGenericSpotDirA === 'string' &&
        selectedGenericSpotDirA.trim() !== '' &&
        typeof selectedGenericSpotDirB === 'string' &&
        selectedGenericSpotDirB.trim() !== ''
        : selectedEvent.id === 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER'
          ? typeof selectedGenericSpotDirA === 'string' &&
          selectedGenericSpotDirA.trim() !== ''
          : selectedPrimaryReaderB?.name?.trim() !== '';
  };

  function handleUploadData() {
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
    } = {};
    // Adding validation for each field
    if (!selectedEvent?.id) {
      newErrors.event = 'Event is required';
    }
    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!delay) {
      newErrors.delay = 'Delay is required';
    }
    if (isDriverTagEnabled && !driverTagTimeOut) {
      newErrors.driverTagTimeOut = 'Driver Tag Timeout is required';
    }
    if (isSecurityTagEnabled && !securityTagTimeOut) {
      newErrors.sequrityDelay = 'Security Delay is required';
    }
    if (!minTagCount) {
      newErrors.minTagCount = 'Minimum Tag Count is required';
    }
    if (!selectedDate) {
      newErrors.selectedDate = 'Selected Date is required';
    }
    if (!selectedSecondaryReaderB) {
      newErrors.selectedSecondaryReaderB = 'Secondary Reader B is required';
    }
    if (!selectedSecondaryReaderA) {
      newErrors.selectedSecondaryReaderA = 'Secondary Reader A is required';
    }
    if (!validIdA) {
      newErrors.validIdA = 'Valid ID A is required';
    }
    if (!validIdB) {
      newErrors.validIdB = 'Valid ID B is required';
    }
    if (!selectedSmartConnector.id) {
      newErrors.selectedSmartConnector = 'Smart Connector is required';
    }
    if (!selectedWeightParser.id) {
      newErrors.selectedWeightParser = 'Weight Parser is required';
    }
    if (!platformReadyTicks) {
      newErrors.platformReadyTicks = 'Platform Ready Ticks is required';
    }
    if (!minVehicleWeight) {
      newErrors.minVehicleWeight = 'Minimum Vehicle Weight is required';
    }
    if (!platformMaxWeight) {
      newErrors.platformMaxWeight = 'Platform Max Weight is required';
    }
    if (!platformMinWeight) {
      newErrors.platformMinWeight = 'Platform Min Weight is required';
    }
    if (!stableWeightTolerance) {
      newErrors.stableWeightTolerance = 'Stable Weight Tolerance is required';
    }
    if (!stableWeightTicks) {
      newErrors.stableWeightTicks = 'Stable Weight Ticks is required';
    }
    if (!selectedDisplayA.id) {
      newErrors.selectedDisplayA = 'Display A is required';
    }
    if (!selectedPrimaryReaderA.id) {
      newErrors.selectedPrimaryReaderA = 'Primary Reader A is required';
    }
    if (!selectedGenericSpotDirA.id) {
      newErrors.selectedGenericSpotDirA =
        'Generic Spot Direction A is required';
    }
    if (!selectedDisplayB.id) {
      newErrors.selectedDisplayB = 'Display B is required';
    }
    if (!selectedPrimaryReaderB.id) {
      newErrors.selectedPrimaryReaderB = 'Primary Reader B is required';
    }
    if (!selectedGenericSpotDirB.id) {
      newErrors.selectedGenericSpotDirB =
        'Generic Spot Direction B is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (platformMaxWeight > minVehicleWeight) {
      Alert.alert(
        'Warning',
        'Platform Max Weight is greater than Min Vehicle Weight',
        [
          {
            text: 'OK',
            onPress: () =>
              console.log('OK Pressed', minVehicleWeight, platformMaxWeight),
          },
        ],
        { cancelable: false },
      );
    }
    console.log('selectedEvent.id', selectedEvent.id);
    let typeSpecificFields = {};
    switch (selectedEvent.id) {
      case 'UNIDIRECTIONAL_WEIGHBRIDGE':
        typeSpecificFields = {
          validDiDirA: validIdA,
          primaryReaderIdDirA: selectedPrimaryReaderA.id,
          displayIdDirA: selectedDisplayA.id,
        };
        break;

      case 'BIDIRECTIONAL_WEIGHBRIDGE':
        typeSpecificFields = {
          primaryReaderIdDirB: selectedPrimaryReaderB.id,
          validDiDirA: validIdA,
          primaryReaderIdDirA: selectedPrimaryReaderA.id,
          validDiDirB: validIdB,
          displayIdDirA: selectedDisplayA.id,
          displayIdDirB: selectedDisplayB.id,
        };
        break;
      case 'UNIDIRECTIONAL_WEIGHBRIDGE_3_READER':
        typeSpecificFields = {
          validDiDirA: validIdA,
          primaryReaderIdDirA: selectedPrimaryReaderA.id,
          displayIdDirA: selectedDisplayA.id,
        };
        break;

      case 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER':
        typeSpecificFields = {
          validDiDirA: validIdA,
          displayIdDirA: selectedDisplayA.id,
        };
        break;

      case 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER':
        typeSpecificFields = {
          validDiDirA: validIdA,
          validDiDirB: validIdB,
          displayA: selectedDisplayA.id,
          displayB: selectedDisplayB.id,
        };
        break;
    }
    const input = {
      active: false,
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
      weightParserId: selectedWeightParser.id,
      genericSpotDirA: selectedGenericSpotDirA.id || null,
      genericSpotDirB: selectedGenericSpotDirB.id || null,
    };
    const dataToUpload = {
      ...typeSpecificFields,
      ...input,
    };
    try {
      store.dispatch(
        weighBridgeAdd({
          baseUrls: baseUrls,
          weighData: dataToUpload,
          token: token,
          buCode: buCode,
        }),
      );
    } catch (error) {
      console.log(error);
    }

    console.log('firstScreenData to pass', dataToUpload);
  }
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
