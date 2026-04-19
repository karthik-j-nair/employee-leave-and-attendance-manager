/* eslint-disable react-hooks/exhaustive-deps */
import { login, register, getMe } from "../services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import toast from "react-hot-toast";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (email, password) => {
        setLoading(true);
        let userData = null;
        try {
            userData = await login(email, password);
            setUser(userData.user);
            // console.log("user data - ", userData.user);
            toast.success("Login successful 🎉");
            return userData.user;

        } catch (error) {
            console.error(error);

            toast.error(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password, role, dateOfJoining }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password, role, dateOfJoining });
            toast.success(data.message + " 🎉 Now you can log in!");
            return data;
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetMe();
    }, []);

    return { user, setUser, loading, setLoading, handleLogin, handleRegister };
};