export type AppNavigationParams = {
    // Root Stack Screens
    UrlScreen: { baseUrls: string | null };
    LoginScreen: undefined;
    SplashScreen: undefined;
    Drawer: { screen: string };
  
    // Home Navigation
    HomeScreen: undefined;
    EventLogScreen: { baseUrls: string | null, spotName: string };
    SpotDetailsScreen: { baseUrls: string | null, spotName: string };
    SpotDetailScreen: { data: any[], onPress: any };
  
    // Generic Spot Screens
    GenericSpotScreen: undefined;
    GenericSpotAddScreen: undefined;
  
    // WeighBridge Screens
    WeighbridgesScreen: undefined;
  
    // Root Drawer Screens
    LiveSpot: undefined;
    Weighbridges: undefined;
    GenericSpot: undefined;
  };
  