/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/color/colors';
import {Colors2} from '../../assets/color/Colors2';
import fontSizes from '../../assets/fonts/FontSize';
import {CardItemWith_Icon} from './CardItemWithIcon';
import {ReaderCardContent} from './ReaderCardContent';
import {DisplayCardContent} from './DisplayCardContent';
import { SpotCommandCardContent } from './SpotCommandContent';

// Define possible data types and structures
export interface Reader {
  name?: string;
  ip?: string;
  model?: string;
  type?: string;
  port?: string;
}

export interface Display {
  name?: string;
  ip?: string;
  version?: string;
  type?: string;
}

export interface SpotCommand {
  name: string;
  commandDirA: string;
  autoCommandEnabled: string;
}

interface DataTabProps {
  data: any[];
  dataType: 'readers' | 'displays' | 'spotCommands';
  noDataMessage?: string;
  stylesOverride?: object;
}

const DataTab: React.FC<DataTabProps> = ({
  data,
  dataType,
  noDataMessage = 'No Data Available',
  stylesOverride,
}) => {
  const combinedStyles = {...styles, ...stylesOverride};


  // Render content based on the data type
  const renderData = () => {
    switch (dataType) {
      case 'readers':
        return data.map((item: Reader) => (
          <CardItemWith_Icon
            iconName={'wifi-tethering'}
            view={ReaderCardContent(item)}
          />
        ));
      case 'displays':
        return data.map((item: Display) => (
          <CardItemWith_Icon
            iconName={'monitor'}
            view={DisplayCardContent(item)}
          />
        ));
      case 'spotCommands':
        return data.map((item: SpotCommand) => (
          <CardItemWith_Icon
            iconName={'monitor'}
            view={SpotCommandCardContent(item)}
          />
        ));
      default:
        return (
          <Text style={combinedStyles.noDataText}>Unsupported Data Type</Text>
        );
    }
  };

  return (
    <View style={combinedStyles.tabContainer}>
      {data.length > 0 ? (
        renderData()
      ) : (
        <Text style={combinedStyles.noDataText}>{noDataMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#aaa',
  },
});

export default DataTab;
