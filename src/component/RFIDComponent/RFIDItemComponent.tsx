/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardItemWith_Icon from '../../reuseableComponent/card/CardItemWithIcon';
import { ReaderCardContent } from '../../reuseableComponent/card/ReaderCardContent';
import { Reader } from '../../reuseableComponent/card/DetailsCard';
import { IconName } from '../../assets/constants/Lable';

type init = {
  reader: Reader;
  handleDelete: (reader: any) => void;
};
const RfidItem: React.FC<init> = ({ reader, handleDelete }) => {
  return (

    <SafeAreaView>
      <CardItemWith_Icon
        iconName={IconName.WIFI_THETHERING}
        view={
          ReaderCardContent(reader, true, handleDelete)
        } 
      />
    </SafeAreaView>

  );
};
export default React.memo(RfidItem);
