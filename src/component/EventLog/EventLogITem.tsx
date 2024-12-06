import React, { memo, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';
import fontSizes from '../../assets/fonts/FontSize';
import { Colors2 } from '../../assets/color/Colors2';
import CustomIcon from '../../reuseableComponent/customIcons/CustomIcon';

type EventLogItemProps = {
  item: {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    details: any;
    spot: string;
    vehicleNumber: any;
    direction: any;
    tagId: any;
  };
  isSelected: boolean;
  onToggle: any;

};

const EventLogItem = React.memo(({ item, isSelected, onToggle }: EventLogItemProps) => {

  const formattedDetails = JSON.stringify(item.details, null, 2);
  // console.log("Rendered EventLogItem for: ", item.id);
  return (
    <View style={{ flex: 1, }}>
      {/* Card Container */}
      <TouchableOpacity

        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.contentContainer}>
          {/* Event Icon and Title */}
          <View style={styles.iconTitleContainer}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', flex: 1 }}>
              <View style={{
                flexDirection: 'column', marginLeft: 10,
              }}>
                <Text style={styles.spotTitle}>
                  {item.name}
                </Text>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>

              <CustomIcon iconPath={!isSelected ? require("../../assets/icons/downArrowLight.png") : require("../../assets/icons/upArrrowLight.png")} onPress={onToggle} />
            </View>
          </View>
        </View>

        {/* Event Type */}


        {/* Created At and Message ID */}
        <View style={{
          flexDirection: 'row',
          marginTop: 5,
          columnGap: 0,
          flex: 1,
        }}>
          <View style={styles.messageContainer}>
            <Text style={styles.label}>Spot</Text>
            <Text style={styles.valueText}>{item.spot.substring(0, 12)}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.label}>Message ID:</Text>
            <Text style={styles.valueText}>{item.id}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.valueText}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

        </View>
        {isSelected && (
          <View>
            <View style={{
              flexDirection: 'row',
              marginTop: 8,
            }}>
              <View style={styles.messageContainer}>
                <Text style={styles.label}>TagId</Text>
                <Text style={styles.valueText}>{item.tagId ? item.tagId : "null"}</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.label}>Direction:</Text>
                <Text style={styles.valueText}>{item.direction ? item.direction : "null"}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>vehicleNo:</Text>
                <Text style={styles.valueText}>
                  {item.vehicleNumber ? item.vehicleNumber : "null"}
                </Text>
              </View>

            </View>
            <View style={{ marginTop: 20 }}>
              <Text>
                Details:-
              </Text>
              <View style={styles.detailsContainer}>

                <Text style={styles.detailsText}>
                  {formattedDetails}
                </Text>
              </View>
            </View>
          </View>

        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    elevation: 3,
    backgroundColor: colors.white,
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
  },
  spotTitle: {
    fontSize: fontSizes.title,
    color: Colors2.SecondaryTextColor,
  },
  typeText: {
    fontSize: fontSizes.smallText,
    color: Colors2.SecondaryTextColor,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8,
  },
  dateContainer: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    marginStart: 10,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: fontSizes.smallText,
    color: Colors2.HelperTextColor,
    fontWeight: '600',
  },
  valueText: {
    fontSize: fontSizes.smallText,
    color: Colors2.SecondaryTextColor,
    fontWeight: '500',
    marginTop: 2,
  },
  detailsContainer: {
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 15,
  },
  detailsText: {
    fontSize: fontSizes.smallText,
    color: Colors2.HelperTextColor,
  },
});

export default EventLogItem;
