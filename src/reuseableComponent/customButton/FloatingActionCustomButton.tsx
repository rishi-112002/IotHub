import * as React from 'react';
import { Animated } from 'react-native';
import { FAB } from 'react-native-paper';
import colors from '../../assets/color/colors';
import { ImagePath } from '../../assets/constants/Lable';
import { ButtonStyles } from '../../styles/ButtonStyles';

function FloatingActionCutomButton(props: { onPress: any, translateButtonY: any }) {
    const { onPress, translateButtonY } = props
      const { buttonStyles } = ButtonStyles();
    return (
        <Animated.View style={{
            transform: [{ translateY: translateButtonY }], elevation: 5,
            zIndex: 100000,
        }}>
            <FAB
                icon={ImagePath.PLUS_ICON}
                style={buttonStyles.floatingActionButton}
                onPress={onPress}
                color={colors.white}
            />
        </Animated.View>)
}

export default FloatingActionCutomButton;