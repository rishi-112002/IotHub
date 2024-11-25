import React, {createContext, useState} from 'react';

// Define the context type
interface DataByConnectivityType {
  genericTypeConnectivity: string;
  setGenericTypeConnectivity: React.Dispatch<React.SetStateAction<string>>;
  weighBridgeTypeConnectivity: string;
  setWeighBridgeTypeConnectivity: React.Dispatch<React.SetStateAction<string>>;
  spotTypeConnectivity: string;
  setSpotTypeConnectivity: React.Dispatch<React.SetStateAction<string>>;
  rfidType: string;
  setRfidType: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with default values
export const DataByConnectivityContext = createContext<DataByConnectivityType>({
  genericTypeConnectivity: 'all', // Default type
  setGenericTypeConnectivity: () => {}, // Placeholder
  weighBridgeTypeConnectivity: 'all', // Default type
  setWeighBridgeTypeConnectivity: () => {}, // Placeholder
  spotTypeConnectivity: 'all', // Default type
  setSpotTypeConnectivity: () => {}, // Placeholder
  rfidType: 'all',
  setRfidType: () => {},
});

// Create a provider component
export const InputProvider = (props: {children: React.ReactNode}) => {
  const {children} = props;

  // States for different types
  const [genericTypeConnectivity, setGenericTypeConnectivity] = useState('all');
  const [weighBridgeTypeConnectivity, setWeighBridgeTypeConnectivity] =
    useState('all');
  const [spotTypeConnectivity, setSpotTypeConnectivity] = useState('all');
  const [rfidType, setRfidType] = useState('all');

  return (
    <DataByConnectivityContext.Provider
      value={{
        genericTypeConnectivity,
        setGenericTypeConnectivity,
        weighBridgeTypeConnectivity,
        setWeighBridgeTypeConnectivity,
        spotTypeConnectivity,
        setSpotTypeConnectivity,
        rfidType,
        setRfidType,
      }}>
      {children}
    </DataByConnectivityContext.Provider>
  );
};
