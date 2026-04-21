import axios from 'axios';

const api = axios.create({
    baseURL: 'https://elams.onrender.com/api',
    withCredentials: true,
});

export const getMyLeaves = async () => {
    try {
        const response = await api.get('/leave/my-leaves');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};


export const applyLeave = async ({ startDate, endDate, reason, leaveType }) => {
    try {
        const response = await api.post('/leave/', { startDate, endDate, reason, leaveType });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const cancelLeave = async ({leaveId, cancel}) => {
    try {
        const response = await api.patch(`/leave/${leaveId}`, { cancel });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const editLeave = async ({ leaveId, reason, startDate, endDate, leaveType }) => {
    try {
        const response = await api.patch(`/leave/${leaveId}`, { reason, startDate, endDate, leaveType });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getMyAttendance = async () => {
    try {
        const response = await api.get('/attendance/my-attendance');
        
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const markAttendance = async () => {
    try {
        const response = await api.post('/attendance/');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getEmployees = async () => {
    try {
        const response = await api.get('/auth/employees');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getAllPendingLeaves = async () => {
    try {
        const response = await api.get('/leave/all-pending-leaves');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const approveLeave = async ({ leaveId, status }) => {
    try {
        const response = await api.patch(`/leave/${leaveId}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
