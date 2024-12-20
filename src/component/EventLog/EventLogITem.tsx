import React, { } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomIcon from '../../reuseableComponent/customIcons/CustomIcon';
import { ImagePath, Strings } from '../../assets/constants/Lable';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
import { ComponentStyles } from '../../styles/ComponentStyles';
import { CardStyles } from '../../styles/CardStyles';
import { SpotlistTextComponent } from '../../reuseableComponent/textComponent/SpotListTextComponent';

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
  const { containerStyles } = ContainerStyles();
  const { textStyles } = TextStyles();
  const { styles } = ComponentStyles();
  const { cardStyles } = CardStyles();
  const formattedDetails = JSON.stringify(item.details, null, 2);
  return (
    <View style={containerStyles.mainContainer}>
      {/* Card Container */}
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={containerStyles.contentContainer}>
          {/* Event Icon and Title */}
          <View style={containerStyles.iconTitleContainer}>
            <View style={[styles.row, { flex: 1 }]}>
              <View style={{
                marginLeft: 10,
              }}>
                <Text style={textStyles.spotTitle}>
                  {item.name}
                </Text>
                <Text style={textStyles.typeText}>{item.type}</Text>
              </View>

              <CustomIcon iconPath={!isSelected ? ImagePath.DOWN_ARROW_RIGHT : ImagePath.UP_ARROW} onPress={onToggle} />
            </View>
          </View>
        </View>

        {/* Event Type */}


        {/* Created At and Message ID */}

        <View style={[cardStyles.cardRowConatiner, { justifyContent: "space-around" }]}>
          <SpotlistTextComponent name={Strings.SPOT} value={item.spot.substring(0, 12)} />
          <SpotlistTextComponent name={Strings.MESSAGE_ID} value={item.id} />
          <SpotlistTextComponent name={Strings.CREATED_AT} value={new Date(item.createdAt).toLocaleDateString()} />


        </View>
        {isSelected && (
          <View>
            <View style={[cardStyles.cardRowConatiner, { justifyContent: "space-around" }]}>
              <SpotlistTextComponent name={Strings.TAG_ID} value={item.tagId ? item.tagId : "null"} />
              <SpotlistTextComponent name={Strings.DIRECTION} value={item.direction ? item.direction : "null"} />
              <SpotlistTextComponent name={Strings.VEHICLE_NO} value={item.vehicleNumber ? item.vehicleNumber : "null"} />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>
                {Strings.DETAILS}
              </Text>
              <View style={containerStyles.detailsContainer}>

                <Text style={textStyles.detailsText}>
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
export default EventLogItem;
