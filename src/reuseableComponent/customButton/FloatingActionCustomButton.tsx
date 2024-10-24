import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import colors from '../../assets/color/colors';

function FloatingActionCutomButton(props: { onPress: any  , translateButtonY: any}) {
    const { onPress ,translateButtonY} = props
    return (
        <Animated.View style={{
            transform: [{ translateY: translateButtonY }], elevation: 5,
            zIndex: 100000,
          }}>
        <FAB
            icon={require("../../assets/images/plusIcon.png")}
            style={styles.fab}
            onPress={onPress}
            color={colors.white}
        />
        </Animated.View>)
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        backgroundColor: colors.AppPrimaryColor,
        tintColor: "white",
        padding: 0,
        marginBottom: 40,
        marginEnd: 30,
        right: 0,
        bottom: 0,
    },
})

export default FloatingActionCutomButton;