import React from 'react';
import {View,StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import {Colors2} from '../../assets/color/Colors2';
import fontSizes from '../../assets/fonts/FontSize';

interface ChildComponentProps {
  view: React.ReactNode;
  iconName: string;
}

export const CardItemWith_Icon: React.FC<ChildComponentProps> = ({
  view,
  iconName,
}) => {
  return (
    <View style={combinedStyles.tabItem}>
      <View style={combinedStyles.row}>
        <View style={combinedStyles.iconContainer}>
          <MaterialIcons name={iconName} size={20} color={Colors2.IconColor} />
        </View>
        {view}
      </View>
    </View>
  );
};

const combinedStyles = StyleSheet.create({
  tabItem: {
    marginTop:5,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: Colors2.DividerColor,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
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
    borderColor: Colors2.DividerColor,
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
    fontSize: 16,
    color: Colors2.SecondaryTextColor,
  },
  commandNameText: {
    marginTop: 0,
    fontSize: 16,
    color: Colors2.SecondaryTextColor,
  },
  ipText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors2.SecondaryTextColor,
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
    color: Colors2.HelperTextColor,
  },
  detailText: {
    fontSize: 12,
    color: Colors2.SecondaryTextColor,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#aaa',
  },
});
