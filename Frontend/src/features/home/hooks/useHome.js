/* eslint-disable react-hooks/exhaustive-deps */
import { getMyLeaves, applyLeave, cancelLeave, editLeave, getMyAttendance, markAttendance, logout, getEmployees, getAllPendingLeaves, approveLeave } from "../services/api.service";
import { useContext, useEffect } from "react";
import { HomeContext } from "../home.context";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/hooks/useAuth";

export const useHome = () => {
    const { user } = useAuth();
    const { leaves, loading, setLeaves, setLoading, myattendance, setMyattendance, employees, setEmployees, pendingLeaves, setPendingLeaves } = useContext(HomeContext);

    async function handleGetMyLeaves() {
        setLoading(true);
        try {
            const data = await getMyLeaves();
            setLeaves(data.leaves);
            // toast.success(data.message);
        } catch (error) {
            console.error("Error fetching leaves:", error);
            toast.error(error?.message || "Failed to fetch leaves");

        } finally {
            setLoading(false);
        }
    }

    async function handleApplyLeave({ startDate, endDate, reason, leaveType }) {
        setLoading(true);
        try {
            const data = await applyLeave({ startDate, endDate, reason, leaveType });
            toast.success(data.message);
            await handleGetMyLeaves();
        } catch (error) {
            console.error("Error applying for leave:", error);
            toast.error(error?.message || "Failed to apply for leave");
        } finally {
            setLoading(false);
        }
    }

    async function handleCancelLeave({ leaveId, cancel }) {
        setLoading(true);
        try {
            const data = await cancelLeave({ leaveId, cancel });
            toast.success(data.message);
            await handleGetMyLeaves();
        } catch (error) {

            console.error("Error canceling leave:", error.message);
            toast.error(error?.message || "Failed to cancel leave");
        } finally {
            setLoading(false);
        }
    }

    async function handleEditLeave({ leaveId, reason, startDate, endDate, leaveType }) {
        setLoading(true);
        try {
            const data = await editLeave({ leaveId, reason, startDate, endDate, leaveType });
            toast.success(data.message);
            await handleGetMyLeaves();
        } catch (error) {
            console.error("Error editing leave:", error.message);
            toast.error(error?.message || "Failed to edit leave");
        } finally {
            setLoading(false);
        }
    }

    async function handleGetMyAttendance() {
        setLoading(true);
        try {
            const data = await getMyAttendance();
            setMyattendance(data.attendance);
        } catch (error) {
            console.error("Error fetching attendance:", error);
            toast.error(error?.message || "Failed to fetch attendance");
        } finally {
            setLoading(false);
        }
    }

    async function handleMarkAttendance() {
        setLoading(true);
        try {
            const data = await markAttendance();
            toast.success(data.message);
            await handleGetMyAttendance();
        } catch (error) {
            console.error("Error marking attendance:", error);
            toast.error(error?.message || "Failed to mark attendance");
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        // Clear any authentication tokens or user data here
        const data = await logout();
        toast.success(data.message);
        // Redirect to login page or perform any other necessary cleanup
    }

    async function handleGetEmployees() {
        setLoading(true);
        try {
            const data = await getEmployees();
            setEmployees(data.employees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            toast.error(error?.message || "Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    }

    async function handleGetAllPendingLeaves() {
        setLoading(true);
        try {
            const data = await getAllPendingLeaves();
            setPendingLeaves(data.leaves);
        } catch (error) {
            console.error("Error fetching pending leaves:", error);
            toast.error(error?.message || "Failed to fetch pending leaves");
        } finally {
            setLoading(false);
        }
    }

    async function handleLeaveAction(leaveId, status) {
  try {
    const data = await approveLeave({leaveId, status});
    toast.success(data.message);
    await handleGetAllPendingLeaves();
  } catch (error) {
    toast.error(error?.message);
  }
}

    useEffect(() => {
        if (!user) return;

        if (user.role === "employee") {
            handleGetMyLeaves();
            handleGetMyAttendance();
        }

        if (user.role === "admin") {
            handleGetEmployees();
            handleGetAllPendingLeaves();
        }
    }, [user]);

    return { leaves, loading, myattendance, employees, pendingLeaves, handleGetMyLeaves, handleApplyLeave, handleCancelLeave, handleEditLeave, handleMarkAttendance, handleLogout, handleLeaveAction };
};   