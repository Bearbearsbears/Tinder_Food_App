import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/client"; 
type AuthValue = {
  user: User | null;
  loading: boolean;
  loginGoogle: () => Promise<any>;
  logout: () => Promise<void>;
};
const Ctx = createContext<AuthValue>({
  user: null,
  loading: true,
  loginGoogle: async () => {},
  logout: async () => {},
});
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <Ctx.Provider value={{ user, loading, loginGoogle, logout }}>
      {children}
    </Ctx.Provider>
  );
}
