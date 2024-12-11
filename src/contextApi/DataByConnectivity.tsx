import React, { createContext, useState } from 'react';
import { Strings } from '../assets/constants/Lable';

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
  genericTypeConnectivity: Strings.ALL, // Default type
  setGenericTypeConnectivity: () => { }, // Placeholder
  weighBridgeTypeConnectivity:Strings.ALL, // Default type
  setWeighBridgeTypeConnectivity: () => { }, // Placeholder
  spotTypeConnectivity:Strings.ALL, // Default type
  setSpotTypeConnectivity: () => { }, // Placeholder
  rfidType:Strings.ALL,
  setRfidType: () => { },
});

// Create a provider component
export const InputProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;

  // States for different types
  const [genericTypeConnectivity, setGenericTypeConnectivity] = useState(Strings.ALL);
  const [weighBridgeTypeConnectivity, setWeighBridgeTypeConnectivity] =
    useState(Strings.ALL);
  const [spotTypeConnectivity, setSpotTypeConnectivity] = useState(Strings.ALL);
  const [rfidType, setRfidType] = useState(Strings.ALL);

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
