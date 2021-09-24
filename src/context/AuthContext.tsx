import React, {createContext, useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const UserContext = createContext<FirebaseAuthTypes.User | null>(null);

type UserContextProp = {
  children: React.ReactNode;
};

export const UserContextProvider = ({children}: UserContextProp) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
