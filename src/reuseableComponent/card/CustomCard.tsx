import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../assets/color/colors';

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: colors.AppPrimaryColor,
    },
});

export default Card;
