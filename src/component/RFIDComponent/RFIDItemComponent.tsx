/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CardItemWith_Icon} from '../../reuseableComponent/card/CardItemWithIcon';
import {ReaderCardContent} from '../../reuseableComponent/card/ReaderCardContent';
import { Reader } from '../../reuseableComponent/card/DetailsCard';

type init = {
  reader: Reader;
  handleDelete: (reader: any) => void;
};

// Main component
const RfidItem: React.FC<init> = ({reader, handleDelete}) => {
  // eslint-disable-next-line no-return-assign
  return (
   
      <SafeAreaView>
        <CardItemWith_Icon
          iconName="wifi-tethering"
          view={
            ReaderCardContent(reader, true, handleDelete)
          }
        />
      </SafeAreaView>

  );
};
export default React.memo(RfidItem);
