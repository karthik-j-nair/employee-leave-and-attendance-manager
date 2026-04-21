import axios from 'axios';

const api = axios.create({
    baseURL: '/api/auth',
    withCredentials: true,
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        // console.log(response.data);
        
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const register = async ({username, email, password, role, dateOfJoining}) => {
    try {
        const response = await api.post('/register', { username, email, password, role, dateOfJoining });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    };
}

export const getMe = async () => {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
