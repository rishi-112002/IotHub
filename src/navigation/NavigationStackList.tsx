export type AppNavigationParams = {
  // Root Stack Screens
  UrlScreen: { baseUrls: string | null };
  LoginScreen: undefined;
  SplashScreen: undefined;
  Drawer: { screen: string };

  // Home Navigation
  HomeScreen: undefined;
  EventLogScreen: { baseUrls: string | null; spotName: string };
  SpotDetailsScreen: { baseUrls: string | null; spotName: string };
  SpotDetailScreen: { data: any[] };

  // Generic Spot Screens
  GenericSpotScreen: undefined;
  GenericSpotAddScreen: { id: any };

  // WeighBridge Screens
  WeighbridgesScreen: undefined;
  WeighbridgesAddScreen:  { id: any };
  WeighbridgesAddScreenSecound: { data: {} };

  // Root Drawer Screens
  HomeNavigation: undefined;
  Weighbridges: undefined;
  GenericSpot: undefined;
  RfidScreenNavigation: undefined;


  RfidReader: undefined,
  RfidAdd: undefined,
  RfidEdit: undefined
};
