export const tokenUtils = {
    getToken: () => localStorage.getItem('token'),
    
    setToken: (token: string) => {
      localStorage.setItem('token', token);
    },
    
    removeToken: () => {
      localStorage.removeItem('token');
    },
  
    decodeToken: (token: string) => {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    }
  };
  