import { useContext, createContext, useMemo } from "react";
import { firebase, FieldValue } from "../lib/firebase";

const FirebaseContext = createContext({ firebase, FieldValue });

export default function FirebaseProvider({ children }: { children: JSX.Element }) {
  return useMemo(
    () => (
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        {children}
      </FirebaseContext.Provider>
    ),
    [firebase]
  );
}

export const useFirebaseValue = () => useContext(FirebaseContext);
