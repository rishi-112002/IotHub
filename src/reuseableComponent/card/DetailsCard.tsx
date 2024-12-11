import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import CardItemWith_Icon from './CardItemWithIcon';
import { ReaderCardContent } from './ReaderCardContent';
import { DisplayCardContent } from './DisplayCardContent';
import { SpotCommandCardContent } from './SpotCommandContent';
import { errorStrings, IconName } from '../../assets/constants/Lable';

// Define possible data types and structures
export interface Reader {
  type?: string;
  id: string;
  name: string;
  model?: string;
  ip: string;
  port: number;
}

export interface Display {
  name?: string;
  ip?: string;
  version?: string;
  type?: string;
}

export interface SpotCommand {
  id: number;
  name: string;
  commandDirA: string;
  autoCommandEnabled: string;
}

interface DataTabProps {
  data: any[];
  dataType: 'readers' | 'displays' | 'spotCommands';
  noDataMessage?: string;
  stylesOverride?: object;
  allow?: boolean;
  // handleDelete?: any;
}

const DataTab: React.FC<DataTabProps> = ({
  data,
  dataType,
  noDataMessage = 'No Data Available',
  stylesOverride,
  allow = false,
  // handleDelete,
}) => {
  const combinedStyles = { ...styles, ...stylesOverride };

  // Render content based on the data type
  const renderData = () => {
    switch (dataType) {
      case 'readers':
        return data.map((item: Reader, index: number) => (
          <CardItemWith_Icon
            key={item.id || index}
            iconName={IconName.WIFI_THETHERING}
            view={ReaderCardContent(item, allow, () => console.log("hey"))}
          />
        ));
      case 'displays':
        return data.map((item: Display) => (
          <CardItemWith_Icon
            iconName={IconName.MONITOR}
            view={DisplayCardContent(item)}
          />
        ));
      case 'spotCommands':
        return data.map((item: SpotCommand) => (
          <CardItemWith_Icon
          iconName={IconName.MONITOR}
            view={SpotCommandCardContent(item)}
          />
        ));
      default:
        return (
          <Text style={combinedStyles.noDataText}>{errorStrings.UNSUPPORTED_DATA_TYPE}</Text>
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
    color: colors.lightGray,
  },
});

export default DataTab;
