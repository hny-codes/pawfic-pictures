'use client';

import {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { account } from '@/appwriteConfig';
import { Models } from 'appwrite';

// Context Type
type UserContextType = {
  user: null | Models.User<Models.Preferences>;
  setUser: Dispatch<SetStateAction<Models.User<Models.Preferences> | null>>;
};

// Create auth context
export const AuthContext =
  createContext<null | Models.User<Models.Preferences>>(null);

// Create exportable provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | Models.User<Models.Preferences>>(
    null
  );

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      if ((error as any).code === 401) {
        console.error('No login session available!');
      }
    }
  };

  const contextData: UserContextType = {
    user,
    setUser,
  };

  return (
    // @ts-ignore
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// Hook to access auth data
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
