import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import CustomIcon from "../../reuseableComponent/customIcons/CustomIcon";
import colors from "../../assets/color/colors";
import { ImagePath, Strings } from "../../assets/constants/Lable";
import { ComponentStyles } from "../../styles/ComponentStyles";
import { CardStyles } from "../../styles/CardStyles";
import { ContainerStyles } from "../../styles/ContainerStyles";
import { TextStyles } from "../../styles/TextStyles";
import { SpotlistTextComponent } from "../../reuseableComponent/textComponent/SpotListTextComponent";

function SpotDataByTypeSubComponent(props: { height: any, handleDelete: any, item: any, navigate: any, navigation: any }) {
    const { item, handleDelete, navigate, navigation } = props
    const { styles } = ComponentStyles();
    const { textStyles } = TextStyles();
    const { cardStyles } = CardStyles();
    const { containerStyles } = ContainerStyles()
    return (
        <View style={containerStyles.mainContainer}>
            <View style={containerStyles.spotContainer}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('SpotDetailScreen', { data: item })
                    }>
                    <View style={styles.row}>
                        <View style={containerStyles.rowSubContainer}>

                            <Text style={textStyles.spotTitle}>{item.name}</Text>
                            <View style={item.active ? containerStyles.activeStatusContainer : containerStyles.inactiveStatusContainer}>
                                <Text
                                    style={[
                                        textStyles.statusText,
                                        {
                                            color: item.active ? colors.greenBase : colors.redBase,
                                        },
                                    ]}>
                                    {item.active ? Strings.CONNECTED : Strings.NOT_CONNECTED}
                                </Text>
                            </View>
                        </View>

                        <View style={containerStyles.statusContainer}>

                            <View style={containerStyles.spotIconContainer}>
                                <CustomIcon
                                    iconPath={ImagePath.DELETE}
                                    onPress={() => handleDelete(item.id)}
                                />
                                <CustomIcon
                                    iconPath={ImagePath.EDIT}
                                    onPress={() => navigate(item.id)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[cardStyles.cardRowConatiner, { justifyContent: 'flex-start', gap: 50 }]}>
                        <SpotlistTextComponent name={Strings.VALID_ID} value={item.validDiDirA} />
                        <SpotlistTextComponent name={Strings.EVENT} value={item.events} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default SpotDataByTypeSubComponent;