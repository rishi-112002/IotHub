export const events = [
  {
    name: 'None',
    id: 'NONE',
  },
  {
    name: 'Tag entry',
    id: 'TAG_ENTRY',
  },
  {
    name: 'Tag entry and exit',
    id: 'TAG_ENTRY_AND_EXIT',
  },
];
export const filters = [
  {
    id: 'SPOT_NAME',
    name: 'Spot Name',
    path: require("../../assets/icons/downArrowBlack.png")
  },
  {
    id: 'FROM_DATE',
    name: 'From Date',
    path: require("../../assets/icons/eventLogs.png")
  },
  {
    id: 'TO_DATE',
    name: 'To Date',
    path: require("../../assets/icons/eventLogs.png")
  },
  {
    id: 'NAME',
    name: 'Name',
    path: require("../../assets/icons/downArrowBlack.png")
  },
  {
    id: 'DIRECTION',
    name: 'Direction',
    path: require("../../assets/icons/downArrowBlack.png")
  },
];


export const direction = [
  {
    name: 'A',
    id: 'A',
  },
  {
    name: 'B',
    id: 'B',
  },
];
export const types = [
  { name: 'Unidirectional', id: 'UNIDIRECTIONAL_WEIGHBRIDGE' },
  { name: 'Bidirectional3R', id: 'BIDIRECTIONAL_WEIGHBRIDGE_3_READER' },
  { name: 'Bidirectional', id: 'BIDIRECTIONAL_WEIGHBRIDGE' },
  { name: 'BidirectionalNR', id: 'BIDIRECTIONAL_WEIGHBRIDGE_NO_READER' },
  { name: 'UnidirectionalNR', id: 'UNIDIRECTIONAL_WEIGHBRIDGE_NO_READER' },
];
export const MODEL_LIST = [
  { name: 'AUR221', value: 'AUR221' },
  { name: 'AUR145', value: 'AUR145' },
  { name: 'AHR023', value: 'AHR023' },
  { name: 'FX9600', value: 'FX9600' },
  { name: 'AHR023-OLD', value: 'AHR023-OLD' },
];


export const EventNames = [
  { name: "AutoCommand", id: "AUTO_COMMAND" },
  { name: "VisionService", id: "VISION_SERVICE" },
  { name: "ControllerCommand", id: "CONTROLLER_COMMAND" },
  { name: "ControllerResult", id: "CONTROLLER_RESULT" },
  { name: "DisplayCommand", id: "DISPLAY_COMMAND" },
  { name: "DisplayResult", id: "DISPLAY_RESULT" },
  { name: "DeviceConnected", id: "DEVICE_CONNECTED" },
  { name: "DeviceDisconnected", id: "DEVICE_DISCONNECTED" },
  { name: "ExternalCommand", id: "EXTERNAL_COMMAND" },
  { name: "InvalidResponse", id: "INVALID_RESPONSE" },
  { name: "PlatformReady", id: "PLATFORM_READY" },
  { name: "PlatformReadyDelayed", id: "PLATFORM_READY_DELAYED" },
  { name: "RequestTimeout", id: "REQUEST_TIMEOUT" },
  { name: "TagEntryDelayed", id: "TAG_ENTRY_DELAYED" },
  { name: "TagEntryRequest", id: "TAG_ENTRY_REQUEST" },
  { name: "TagEntryResponse", id: "TAG_ENTRY_RESPONSE" },
  { name: "TagExitRequest", id: "TAG_EXIT_REQUEST" },
  { name: "TagExitResponse", id: "TAG_EXIT_RESPONSE" },
  { name: "UnknownResponse", id: "UNKNOWN_RESPONSE" },
  { name: "VehicleArrived", id: "VEHICLE_ARRIVED" },
  { name: "WeighmentBypass", id: "WEIGHMENT_BYPASS" },
  { name: "WeighmentDelayed", id: "WEIGHMENT_DELAYED" },
  { name: "WeighmentRequest", id: "WEIGHMENT_REQUEST" },
  { name: "WeighmentResponse", id: "WEIGHMENT_RESPONSE" },
  { name: "WeighmentUnsuccessful", id: "WEIGHMENT_UNSUCCESSFUL" },
  { name: "SecurityTagDelayed", id: "SECURITY_TAG_DELAYED" },
  { name: "DriverTagDelayed", id: "DRIVER_TAG_DELAYED" },
  { name: "WeighbridgeExpired", id: "WEIGHBRIDGE_EXPIRED" }
]

