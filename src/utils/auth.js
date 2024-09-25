// src/utils/auth.js

export const getAuthConfig = () => {
    const userData = localStorage.getItem("userData1");
    const token = userData ? JSON.parse(userData).token : null;
  
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  