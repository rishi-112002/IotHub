import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/color/colors';
import { IconName, Strings } from '../../assets/constants/Lable';
import { CardStyles } from '../../styles/CardStyles';
import { ContainerStyles } from '../../styles/ContainerStyles';
import { TextStyles } from '../../styles/TextStyles';
import { TextComponent } from '../../reuseableComponent/textComponent/TextComponent';

// This component takes 'spotData' as a prop and renders various details about a spot.
// <<<<<<< HEAD
const SpotDetailsComponent = (props: { spotData: any }) => {
    const { spotData } = props;
    const {
        connectivity,
        weight,
        weightStable,
        di,
        currentState,
        readers,
    } = spotData; // Destructure data properties from spotData object
    const { textStyles } = TextStyles();
    const { cardStyles } = CardStyles();
    const { containerStyles } = ContainerStyles()
    return (
        // Wrapping the entire component inside ScrollView to handle long content with vertical scrolling
        <View style={containerStyles.mainContainer}>

            {/* <View style={{flex:1}}> */}
            <View style={containerStyles.listContainer}>

                <TextComponent
                    name={Strings.CONNECTIVITY}
                    value={connectivity || Strings.NA}
                    error={null}
                />
                <TextComponent
                    name={Strings.WEIGHT}
                    value={weight !== null ? weight : Strings.NA}
                    error={null}
                />
                <TextComponent
                    name={Strings.WEIGHT_SCALE}
                    value={weightStable ? Strings.STABLE : Strings.NOT_STABLE}
                    error={null}
                />
                <TextComponent
                    name={Strings.DIGITAL_INPUT_DI}
                    value={di || Strings.NA}
                    error={null}
                />
                <TextComponent
                    name={Strings.CURRENT_STATE}
                    value={currentState || Strings.NA}
                    error={null}
                />
            </View>
            {/* Readers Section */}
            {
                readers && readers.length > 0 && (
                    <Card style={cardStyles.cardStyle}>
                        <Text style={textStyles.sectionTitle}>{Strings.READERS}</Text>
                        {/* Iterate through the readers array and display the health status of each device */}
                        {readers.map((reader: any, index: number) => (
                            <View key={index} style={containerStyles.readerContainer}>
                                {/* Conditionally render icon color based on health status */}
                                <MaterialIcons
                                    name={reader.healthStatus === Strings.OUT_OF_SERVICE ? IconName.ERROR_OUTLINE : IconName.CHECK_CIRCLE}
                                    size={24}
                                    color={reader.healthStatus === Strings.OUT_OF_SERVICE ? colors.redDarkest : colors.greenDarkest}
                                />
                                <View>
                                    <Text style={textStyles.readerText}>{Strings.DEVICE_ID}: {reader.deviceId}</Text>
                                    <Text style={textStyles.readerText}>{Strings.HEALTH_STATUS}: {reader.healthStatus}</Text>
                                </View>
                            </View>
                        ))}
                    </Card>
                )
            }
        </View >
    );
};
export default SpotDetailsComponent;
