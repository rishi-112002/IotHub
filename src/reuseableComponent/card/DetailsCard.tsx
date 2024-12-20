import React from 'react';
import { View, Text } from 'react-native';
import CardItemWith_Icon from './CardItemWithIcon';
import { ReaderCardContent } from './ReaderCardContent';
import { DisplayCardContent } from './DisplayCardContent';
import { SpotCommandCardContent } from './SpotCommandContent';
import { errorStrings, IconName } from '../../assets/constants/Lable';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';

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
  allow = false,
  // handleDelete,
}) => {
  const { textStyles } = TextStyles();
  const { containerStyles } = ContainerStyles();

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
          <Text style={textStyles.noDataText}>{errorStrings.UNSUPPORTED_DATA_TYPE}</Text>
        );
    }
  };

  return (
    <View style={containerStyles.container}>
      {data.length > 0 ? (
        renderData()
      ) : (
        <Text style={textStyles.noDataText}>{noDataMessage}</Text>
      )}
    </View>
  );
};


export default DataTab;
