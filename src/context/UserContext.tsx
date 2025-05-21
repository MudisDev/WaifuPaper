import React, { createContext, useState, ReactNode } from 'react';

interface UserData {
  // Define aquí los campos que necesitas para tu usuario
  username?: string; // Ejemplo de un campo que podrías tener
  // Puedes agregar más propiedades según tus necesidades
  name: string;
  phoneNumber: string;
  email: string;
  profilePhoto: string;
  //registerDate: string;
  idUser: number;
  gender: string;
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