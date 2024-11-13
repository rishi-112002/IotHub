export type AppNavigationParams = {
  // Root Stack Screens
  UrlScreen: { baseUrls: string | null };
  LoginScreen: undefined;
  SplashScreen: undefined;
  Drawer: { screen: string };

  // Home Navigation
  HomeScreen: undefined;
  EventLogScreen: { baseUrls: string | null; spotName: string, data: any };
  SpotDetailsScreen: { baseUrls: string | null; spotName: string };
  SpotDetailScreen: { data: any[] };

  // Generic Spot Screens
  GenericSpotScreen: undefined;
  GenericSpotAddScreen: undefined;

  // WeighBridge Screens
  WeighbridgesScreen: undefined;
  WeighbridgesAddScreen: undefined;
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
  WeighBridgeNavigation: { screen?: string };
  GenericSpot: { screen?: string };
  RfidScreenNavigation: undefined;

  AllEventLogsScreen: undefined;

  DashBoardNavigation: undefined;
};