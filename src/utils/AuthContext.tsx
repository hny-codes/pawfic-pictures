'use client';

import { createContext, useState, useEffect, useContext } from 'react';

export type User = {
  user: boolean;
};

export const AuthContext = createContext<null | User>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const contextData = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>loading..</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
