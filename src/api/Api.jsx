import axios from 'axios';

export const createAxiosInstance = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
    });
};

export const fetchConfigDetails = async (baseURL) => {
    const instance = createAxiosInstance(baseURL);
    try {
        const response = await instance.get('/config.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching config details:', error);
        return null;
    }
};