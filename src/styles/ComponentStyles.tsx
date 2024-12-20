import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";
import fontSizes from "../assets/fonts/FontSize";

export function ComponentStyles() {

    const styles = StyleSheet.create({
        headerRow: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
        },
        burgerIcon: {
            marginRight: 15,
        },
        generalList: {
            maxHeight: 300,
            marginTop: 5,
        },
        iconWrapper: {
            position: 'relative',
        },
        backIcon: {
            marginRight: 15,
        },
        modalheadingicon: {
            flexDirection: 'row',
            columnGap: 30,
        },
        item: {
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            flexDirection: "row",
            justifyContent: "space-between"
        },

        heading: {
            fontSize: fontSizes.heading,
            fontWeight: "bold",
            color: "#000",
        },
        segmentedButton: {
            padding: 0,
        },
        SubView: { justifyContent: "center", alignItems: "center", alignContent: "center" },
        cardRow: {
            alignItems: "center",
            paddingHorizontal: 0,
        },
        section: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 8,
        },

        flatListContent: { flexGrow: 1, },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
        },

        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },


        rowFlexStart: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 10,
        },
        sectionTitle: {
            fontSize: fontSizes.subheading,
            fontWeight: '500',
            color: colors.darkblack,
        },

        tabLabel: {
            fontSize: 14,
            color: colors.darkblack,
        },
        activeTabLabel: {
            color: colors.redBase,
            fontWeight: "bold",
        },
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




        drawerLogo: {
            marginTop: 3,
            width: 22,
            height: 22,
            marginRight: 10,
            tintColor: colors.white,
        },
        drawerHeader: {
            flex: 1,
            margin: -15,
            padding: 20,
            backgroundColor: colors.AppPrimaryColor,
            marginBottom: 5
        },
        drawerItemContainer: {
            flexDirection: 'row',
            alignItems: 'center', // Align items in the center vertically
        },
        drawerItemText: {
            marginLeft: 10,
            fontSize: fontSizes.text,
            color: colors.darkblack,
        },

        drawerSpotContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10, // Adjust spacing between the dropdown and other items
            paddingHorizontal: 18,
        },
        drawerSpotLabel: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
            marginLeft: 10, // Spacing between icon and text
        },
        drawerSubMenu: {
            paddingLeft: 40, // Indent sub-items
            paddingVertical: 5, // Reduce space between submenu items
        },
        drawerSubMenuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5, // Reduce vertical padding
        },

        filterOverlay: {
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.SemiTransparentGray,
        },
        message: {
            marginTop: 10,
            color: '#FFFFFF',
            fontSize: 16,
        },

        filterItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
        },
        selectedFilter: {
            backgroundColor: colors.lightGray,
        },

        searchWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },


        ballFirst: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: colors.blueLightest,

            marginHorizontal: 5,
        },
        ballFour: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: colors.blueBase,
            marginHorizontal: 5,
        },
        ballSecound
            : {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: colors.blueLighter,
            marginHorizontal: 5,
        },
        ballThird: {
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: colors.bluelight,
            marginHorizontal: 5,
        },
        circle: {
            width: 70,
            height: 70,
            borderRadius: 50, // Makes the view a circle
            borderWidth: 5,
            borderColor: colors.blueDarkest,
            justifyContent: 'center',
            alignItems: 'center',
        },
        triggerWrapper: {
            position: 'absolute',
            paddingHorizontal: 5,
            right: 0,
            top: -5
        },
        detailColumn: {
            flex: 1,
            flexDirection: 'column',
        },
        switch: {
            width: 20,
            height: 20,
            borderRadius: 10,
        },
        menuOption: {
            flexDirection: 'row', // To align icon and text horizontally
            alignItems: 'center', // Align items vertically in the center
            paddingVertical: 5, // Padding for touchable area
        },
        switchInactive: {
            backgroundColor: colors.SlateBlue,
            transform: [{ translateX: 0 }],
        },
        switchActive: {
            backgroundColor: colors.white,
            transform: [{ translateX: 24 }], // Move to the right when active
        },
    });
    return {
        styles
    }

}