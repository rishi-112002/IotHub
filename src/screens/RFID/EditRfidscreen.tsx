/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import colors from '../../assets/color/colors';
import CustomButton from '../../reuseableComponent/customButton/CustomButton';
import CustomTextInput from '../../reuseableComponent/customTextInput/CustomTextInput';
import GenericModal from '../../reuseableComponent/modal/GenralModal';
import LoadingModal from '../../reuseableComponent/loader/CustomLoaderFaiz';
import {useEditRfid} from '../../CustomHooks/RFIDHooks/RFIDEditHook';
import { MODEL_LIST } from '../../assets/constants/Constant';

// Define MODEL_LIST here

interface EditRfidScreenProps {
  route: {
    params: {
      item: {
        id: string;
        name: string;
        model?: string;
        ip: string;
        port: number;
      };
    };
  };
}

const EditRfidScreen: React.FC<EditRfidScreenProps> = ({route}) => {
  const {item} = route.params;

  const {
    name,
    model,
    IPAddress,
    port,
    errors,
    Loader,
    dropdownVisible,
    smartControllerLoader,
    setName,
    setIPAddress,
    setPort,
    setDropdownVisible,
    handleSaveData,
    handleInputFocus,
    handleModalSelect,
    showIpAndPortFields,
  } = useEditRfid(item);

  return (
    <ScrollView contentContainerStyle={{backgroundColor: colors.white}}>
      {Loader || smartControllerLoader ? (
        <LoadingModal visible={Loader} message="Processing your request..." />
      ) : (
        <View style={{padding: 20}}>
          <CustomTextInput
            label="Name"
            value={name}
            editable
            errorMessage={errors.name}
            keyboardType="default"
            returnKeyType="next"
            setTextInput={setName}
            onFocus={() => handleInputFocus('name')}
            required={false}
          />
          <CustomTextInput
            label="Model Number"
            value={model}
            editable={false}
            errorMessage={errors.model}
            onPress={() => setDropdownVisible(true)}
            setTextInput={undefined}
            required={false}
          />

          {dropdownVisible && (
            <GenericModal
              options={MODEL_LIST}
              isVisible={dropdownVisible}
              handleCloseModal={() => setDropdownVisible(false)}
              onOptionSelected={handleModalSelect}
              nameKey="name"
              valueKey="value"
            />
          )}

          {/* Conditionally render IP Address and Port fields */}
          {showIpAndPortFields && (
            <>
              <CustomTextInput
                label="IP Address"
                value={IPAddress}
                errorMessage={errors.IPAddress}
                keyboardType="default"
                returnKeyType="next"
                setTextInput={setIPAddress}
                onFocus={() => handleInputFocus('IPAddress')}
                required={false}
              />

              <CustomTextInput
                label="Port Number"
                value={port.toString()}
                errorMessage={errors.port}
                keyboardType="numeric"
                setTextInput={setPort}
                onFocus={() => handleInputFocus('port')}
                required={false}
              />
            </>
          )}

          <CustomButton label="Save" onPress={handleSaveData} />
        </View>
      )}
    </ScrollView>
  );
};

export default EditRfidScreen;
