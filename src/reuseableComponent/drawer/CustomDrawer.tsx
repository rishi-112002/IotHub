import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function CustomDrawerContent() {
    const [isSpotExpanded, setIsSpotExpanded] = useState(false);
    const navigation = useNavigation()
    return (
        <DrawerContentScrollView>
            <DrawerItem
                label="Live Spot"
                onPress={() => console.log("Live Spot")}
            />

            <TouchableOpacity onPress={() => setIsSpotExpanded(!isSpotExpanded)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                    <Text>Spot</Text>
                    <MaterialIcons name={isSpotExpanded ? "expand-less" : "expand-more"} size={20} />
                </View>
            </TouchableOpacity>

            {isSpotExpanded && (
                <View style={{ paddingLeft: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Weighbridges')}>
                        <Text style={{ paddingVertical: 5 }}>WeightBridges</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('GenericSpot')}>
                        <Text style={{ paddingVertical: 5 }}>GenericSpots</Text>
                    </TouchableOpacity>
                </View>
            )}

            <DrawerItem
                label="Settings"
                onPress={() => console.log("Setting")}
            />
            <DrawerItem
                label="About"
                onPress={() => console.log("About")}
            />
        </DrawerContentScrollView>
    );
}
export default CustomDrawerContent;
