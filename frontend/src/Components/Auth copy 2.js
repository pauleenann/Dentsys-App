export const isAuthenticated = () => {
    const token = localStorage.getItem('username');
    return !!token;
  };