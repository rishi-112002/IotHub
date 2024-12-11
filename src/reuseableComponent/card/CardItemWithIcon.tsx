
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';

interface CardItemWithIconProps {
  view: React.ReactNode;
  iconName: string;
}
const CardItemWith_Icon: React.FC<CardItemWithIconProps> = ({ iconName, view }) => {
  return (
    
    <View style={combinedStyles.tabItem}>
      <View style={combinedStyles.row}>
        <View style={combinedStyles.iconContainer}>
          <MaterialIcons name={iconName} size={20} color={colors.IconColor} />
        </View>
        {view}
      </View>
    </View>
  );
};

export default memo(CardItemWith_Icon);
const combinedStyles = StyleSheet.create({
  tabItem: {
    marginTop: 2,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.DividerColor,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    elevation: 5,
  },
  statusText: {
    fontSize: 12,
  },
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    borderRadius: 10,
    padding: 10,
    height: 45,
    borderWidth: 2,
    borderColor: colors.DividerColor,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 5,
    paddingLeft: 10,
  },
  nameText: {
    marginTop: 4,
    fontSize: fontSizes.title,
    color: colors.SecondaryTextColor,
  },
  commandNameText: {
    marginTop: 0,
    fontSize: fontSizes.title,
    color: colors.SecondaryTextColor,
  },
  ipText: {
    marginTop: 4,
    fontSize: fontSizes.smallText,
    color: colors.SecondaryTextColor,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  detailColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: fontSizes.smallText,
    color: colors.HelperTextColor,
  },
  detailText: {
    fontSize: fontSizes.smallText,
    color: colors.SecondaryTextColor,
  },
  noDataText: {
    textAlign: 'center',
    fontSize:fontSizes.text,
    color: '#aaa',
  },
});
