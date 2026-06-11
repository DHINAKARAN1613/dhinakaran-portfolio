import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // Mock verification
        await new Promise(resolve => setTimeout(resolve, 500));
        if (token === 'mock-jwt-token') {
          setAdmin({ email: 'admin@dhinakaran.dev', name: 'Dhinakaran M' });
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@dhinakaran.dev' && password === 'Admin@123') {
      const mockToken = 'mock-jwt-token';
      const mockAdmin = { email, name: 'Dhinakaran M' };
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setAdmin(mockAdmin);
      return { token: mockToken, admin: mockAdmin };
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
