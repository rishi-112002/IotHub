type FilterOption = 'connected' | 'not-connected' | 'all';
export type AppNavigationParams = {

  // Root Stack Screens
  UrlScreen: { baseUrls: string | null };
  LoginScreen: undefined;
  SplashScreen: undefined;
  Drawer: { screen: string };

  // Home Navigation
  HomeScreen: { types: string };
  EventLogScreen: { baseUrls: string | null; spotName: string, data: any };
  SpotDetailsScreen: { baseUrls: string | null; spotName: string };
  SpotDetailScreen: { data: any };

  // Generic Spot Screens
  GenericSpotScreen: undefined;
  GenericSpotAddScreen: { id: any };

  // WeighBridge Screens
  WeighbridgesScreen: undefined;
  WeighbridgesAddScreen: { id: any };
  WeighbridgesAddScreenSecound: { data: {} };

  // Root Drawer Screens



  RfidReader: undefined,
  RfidAdd: undefined,
  RfidEdit: { readers: {} }

  DashBoard: undefined;
  LiveSpot: undefined;

  bottomTabNavigation: undefined
  LiveSpots: undefined


  HomeNavigation: undefined;
  WeighBridgeNavigation: undefined;
  GenericSpotNavigation: undefined;
  RfidScreenNavigation: undefined;

  AllEventLogsScreen: undefined;

  DashBoardNavigation: undefined;

  DrawerStackNavigation: undefined;
};