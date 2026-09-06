import React, { createContext, useState, ReactNode } from 'react';

interface UserData {
  id_usuario: number;
  nombre: string;
  username: string;
  email: string;
  telefono: string;
  genero: string;
  //registerDate: string; 
  foto_perfil: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};