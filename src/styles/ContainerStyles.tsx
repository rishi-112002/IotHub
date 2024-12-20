import { StyleSheet } from "react-native";
import colors from "../assets/color/colors";

export function ContainerStyles() {
    const containerStyles = StyleSheet.create({

        drawerSpotContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10, // Adjust spacing between the dropdown and other items
            paddingHorizontal: 18,
        },

        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: colors.darkerTransparent,
        },
        eventLogCardContainer: {
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
        iconContainer: {
            elevation: 3,
            backgroundColor: colors.white,
            marginTop: 5,
            padding: 5,
            borderRadius: 10,
        },
        spotCommandStatusContainer: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 15,
        },
        infoContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 5,
            paddingLeft: 10,
        },

        SpotCommandDetailsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
            marginTop: 10,
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: colors.white,
            padding: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        },
        Item: {
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
        },
        leftSectionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        filterCountBadgeContainer: {
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: colors.redDarkest,
            borderRadius: 10,
            height: 15,
            width: 15,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
        },
        headerIconContainer: { flexDirection: "row", gap: 10 },

        subHeaderRightSection: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        subHeaderContainer: {
            backgroundColor: colors.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            position: 'absolute',
            top: 0,
            height: 60,
            left: 0,
            right: 0,
        },
        userModalContainer: {
            flex: 1,
            padding: 10,
            alignItems: 'flex-end',
        },
        userModalContent: {
            backgroundColor: 'white',
            borderRadius: 10,
            width: '40%',
        },
        userModalItem: {
            flexDirection: 'row',
            marginVertical: 10,
            marginHorizontal: 15
        },

        genralItem: {
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            flexDirection: "row",
            justifyContent: "space-between"
        },
        itemTextContainer: {
            flexDirection: 'row',
            alignItems: 'center', // Align text and button in the same row
            justifyContent: 'space-between', // Space out the text and the close button
        },
        calendarModalContainer: {
            flex: 1,
            padding: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.darkerTransparent,  // Darker transparent background
        },
        badgeScrollContainer: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            backgroundColor: colors.white,
        },

        filterMenuContainer: {
            marginTop: 60,
            width: '50%',
            backgroundColor: colors.white,
            padding: 5,
            borderRadius: 10,
            alignSelf: 'flex-end',
            marginRight: 10,
            elevation: 5,
        },
        badgeContainer: {
            marginTop: 10,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.blueBase,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 5,
            marginRight: 10,
            position: 'relative',
            flexDirection: 'row',
            columnGap: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        alertContainer: {
            backgroundColor: 'white',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.CloudyWhite,
            elevation: 10,
            shadowColor: colors.darkblack,
            shadowOffset: { width: 10, height: 40 },
            shadowOpacity: 9,
            shadowRadius: 80,
        },
        containerInactive: {
            backgroundColor: colors.SoftGray, // Inactive state background
        },
        CalendarContainer: {
            padding: 20,
            backgroundColor: colors.BabyBlue,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.gray,
            color:colors.PrimaryTextColor
        },
        containerActive: {
            backgroundColor: colors.FreshGreen, // Active state background
        },
        emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
        dateContainer: {
            flex: 1,
        },
        cardContainer: {
            paddingHorizontal: "3%",
            paddingTop: "14%",
            height: "14%",
            rowGap: 20
        },
        subContainer: {
            backgroundColor: colors.white, flex: 1
        },
        contentContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        container: {
            padding: 10,
            backgroundColor: colors.white,
        },
        SubContainer: { flexDirection: "row", justifyContent: "space-between", flex: 1 },

        iconTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        messageContainer: {
            flex: 1,
            marginStart: 10,
            alignItems: 'flex-start',
        },


        detailsContainer: {
            borderRadius: 10,
            marginTop: 5,
            marginHorizontal: 15,
        },

        listContainer: {
            padding: 10,
            flex: 1,
            backgroundColor: colors.white,
        },

        scrollContainer: {
            backgroundColor: colors.white,
            paddingHorizontal: 20,
        },
        mainContainer: {
            flex: 1,
            backgroundColor: colors.white,
        },
        rowSubContainer: { flex: 1, gap: 5 },
        spotContainer: {
            flex: 1,
            paddingStart: 15
        },
        statusContainer: {
            flexDirection: 'row',
            columnGap: 10,
        },

        activeStatusContainer: {
            width: "28%",
            backgroundColor: colors.greenSoftneer,
            paddingHorizontal: 5,
            borderRadius: 20,

        },
        inactiveStatusContainer: {
            width: "38%",
            backgroundColor: colors.BlushPink,
            paddingHorizontal: 5,
            borderRadius: 20,
        },
        spotIconContainer: {
            flexDirection: 'row',
            columnGap: 10,
        },
        cardIconContainer: {
            borderRadius: 10,
            padding: 10,
            height: 45,
            borderWidth: 2,
            borderColor: colors.DividerColor,
        },
        readerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
        },

        rowContainer: {
            flexDirection: 'row', flex: 1
        },
        tabBarContainer: {
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            overflow: 'hidden',
        },

        segmentedContainer: {
            backgroundColor: colors.vLightGray,
            flexDirection: "row", columnGap: 2, padding: 2, borderRadius: 4
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.SoftGray,
            padding: 8,
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: 10,
        },


        drawerItemContainer: {
            flexDirection: 'row',
            alignItems: 'center', // Align items in the center vertically
        },
        drawerBuTextContainer: { borderRadius: 20, borderWidth: 1, borderColor: colors.white, padding: 5 },

        NoInteernetScreenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
        ,

        displayCardDetailsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
            marginTop: 10,
            alignItems: 'center',
        },
        detailColumn: {
            flex: 1,
        },
        loaderContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "transparent",
        },
        switchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 12,
        },

        switchSubContainer: {
            width: 50,
            height: 26,
            borderRadius: 13,
            padding: 3,
            justifyContent: 'center',
        },
    })
    return { containerStyles }
}