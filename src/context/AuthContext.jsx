import { createContext, useContext, useState } from 'react';
import { authApi } from '../api/services';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  const persist = (u, token) => {
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const login = async (cred) => {
    const { token, user: u } = await authApi.login(cred);
    persist(u, token);
  };
  const register = async (data) => {
    const { token, user: u } = await authApi.register(data);
    persist(u, token);
  };
  const updateProfile = async (data) => persist(await authApi.updateProfile(data));
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, register, updateProfile, logout }}>{children}</Ctx.Provider>;
}
