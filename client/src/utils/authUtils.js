
// authUtils.js
export const isAuthenticated = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    return !!token; // Return true if token exists, otherwise false
  };
  