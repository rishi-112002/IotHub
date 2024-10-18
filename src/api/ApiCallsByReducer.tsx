import { GetDisplays, GetReader, GetSmartControllers, GetWeightBridge } from "../reducer/spotAddDetails/SpotAddDetailsAction";
import { store } from "../reducer/Store";

// Define proper props type for baseUrl
type Props = {
    baseUrl: any;
};

// Function to dispatch all required API calls
export function ApiCallsAddGenericSpot({ baseUrl }: Props) {
    store.dispatch(GetReader({ baseUrl }));            
    store.dispatch(GetDisplays({ baseUrl }));             
    store.dispatch(GetSmartControllers({ baseUrl }));    
    store.dispatch(GetWeightBridge({ baseUrl }));         
}
