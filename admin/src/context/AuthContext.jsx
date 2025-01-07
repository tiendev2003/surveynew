import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosClient
        .get("/api/auth/me")
        .then((response) => {
          console.log(response.data.data);
          if (response.data.data) {
            setIsAuthenticated(true);
            setUserRole(response.data.data.role);
            setUserInformation(response.data.data);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        "/api/auth/login",
        credentials
      );
      if (response.data.data) {
        setIsAuthenticated(true);
        setUserRole(response.data.data.user.token);
        setUserInformation(response.data.data.user);
        
        localStorage.setItem("token", response.data.data.token); // Store token
        if (response.data.data.user.role === "admin") {
          window.location.href = "/admin";
        }
        if (response.data.data.user.role === "lecturer") {
          window.location.href = "/lecturer";
        }
        if (response.data.data.user.role === "student") {
          window.location.href = "/student";
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error.response.data.error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserInformation(null);
    localStorage.removeItem("token"); // Remove token
  };

  const updateUserInformation = async (updatedInfo) => {
    try {
      const response = await axiosClient.put(
        "/api/auth/me",
        updatedInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserInformation(response.data.data);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await axiosClient.put("/api/auth/change-password", {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Change password failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        loading,
        userInformation,
        updateUserInformation,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
