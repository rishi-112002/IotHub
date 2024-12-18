import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetBuinessUnits } from '../../reducer/buinessUnits/BuinessUnitsAction';
import { CheckUserlogin, GetBaseUrl } from '../../reducer/Login/LoginAction';
import { RootState, store } from '../../reducer/Store';
function AppNavigationHooks() {
    // State to manage loading status
    const [loading, setLoading] = useState(true);

    // Redux dispatch to trigger actions
    const dispatch = useDispatch();

    // Get necessary data from Redux state
    const baseUrls = useSelector(
        (state: RootState) => state.authentication.baseUrl,
    );
    const userName = useSelector(
        (state: RootState) => state.authentication.userName,
    );
    const token = useSelector((state: RootState) => state.authentication.token);
    const buCode = useSelector((state: RootState) => state.authentication.buCode);

    // Function to check internet connection

    // Function to initialize the app by checking user login status
    const initializeApp = async () => {
        store.dispatch(CheckUserlogin()); // Dispatch action to check user login
        setLoading(false); // Set loading to false after initialization
    };

    // Function to fetch and store the base URL from async storage
    const getBaseUrl = async () => {
        try {
            store.dispatch(GetBaseUrl()); // Dispatch action to get the base URL
        } catch (error) {
            // console.error('Failed to fetch base URL from AsyncStorage', error);
        }
    };

    useEffect(() => {
        // netinfo(); // Check for internet connectivity
        getBaseUrl(); // Fetch the base URL from storage
        initializeApp(); // Initialize app and check user login
    }, [dispatch]);

    // Effect to fetch configuration and business units whenever base URL is available
    useEffect(() => {
        if (baseUrls) {
            store.dispatch(
                GetBuinessUnits({ baseUrl: baseUrls, buCode: buCode, token: token }),
            ); // Dispatch action to get business units
        }
    }, [baseUrls, buCode, token]);

    return {
        userName,
        loading,
    };
}
export default AppNavigationHooks;
