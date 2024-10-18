import { configureStore } from '@reduxjs/toolkit'
import { apiResponseList } from './Reducer'
import { userSlice, authSlice } from './Login/LoginReducer';
import { businessUnitsSlice } from './buinessUnits/BuinessUnitsReducer';
import { spotDataSlice } from './spotData/spotDataReducer';
import { eventLogsSlice } from './eventLogs/EventLogsReducer';
import { spotDetailsSlice } from './spotDetails/spotDetailsReducer';
import { SpotsDataByTypeSlice } from './SpotsDataByType/SpotsDataByTypeReducer';
import { SpotAddDetailsSlice } from './spotAddDetails/SpotAddDetailsReducer';
import { UploadGenericSlice } from './uploadGenericData/uploadGenericDataReducer';
import { GetUrlsSlice } from './url/UrlReducer';
import { DeleteSpotSlice } from './deleteSpot/DeleteSpotReducer';
import { WeighBridgeSlice } from './weighBridge/WeighBridgeReducer';
export const store = configureStore({
  reducer: {
    apiResponse: apiResponseList.reducer,
    buinessUnits: businessUnitsSlice.reducer,
    loginUser: userSlice.reducer,
    authentication: authSlice.reducer,
    spotData: spotDataSlice.reducer,
    eventLogs: eventLogsSlice.reducer,
    spotDetails: spotDetailsSlice.reducer,
    spotsDataByType: SpotsDataByTypeSlice.reducer,
    spotAddDetail: SpotAddDetailsSlice.reducer,
    uploadGeneric: UploadGenericSlice.reducer,
    getUrls: GetUrlsSlice.reducer,
    deletSpot: DeleteSpotSlice.reducer,
    weighBridge: WeighBridgeSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;