import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

type EventLogItemProps = {
  item: {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    details: any;
  };
  onInfoClick: (details: any) => void;
};

const EventLogItem: React.FC<EventLogItemProps> = ({item, onInfoClick}) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <TouchableOpacity
        onPress={() => onInfoClick(item.details)}
        activeOpacity={0.7}>
        <View style={styles.contentContainer}>
          <Text style={styles.spotTitle}>
            {item.name.length > 25
              ? `${item.name.substring(0, 25)}..`
              : item.name}
          </Text>
          <MaterialIcons
            name="info-outline"
            size={24}
            color={colors.blueDarkest}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.createdAt}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Message ID:</Text>
          <Text style={styles.messageId}>{item.id}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotTitle: {
    fontSize: fontSizes.heading,
    color: colors.darkblack,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: fontSizes.text,
    color: 'gray',
    fontWeight: '600',
  },
  typeText: {
    fontSize: fontSizes.text,
    color: colors.blueDarkest,
    fontWeight: '600',
  },
  createdAt: {
    fontSize: fontSizes.text,
    color: colors.darkblack,
  },
  messageId: {
    fontSize: fontSizes.text,
    color: colors.blueDarkest,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 15,
    backgroundColor: '#d4d4d4',
  },
});

export default EventLogItem;
