/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [myattendance, setMyattendance] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [pendingLeaves, setPendingLeaves] = useState([]);
    return (
        <HomeContext.Provider value={{ leaves, setLeaves, loading, setLoading, myattendance, setMyattendance, employees, setEmployees, pendingLeaves, setPendingLeaves }}>
            {children}
        </HomeContext.Provider>
    );
};