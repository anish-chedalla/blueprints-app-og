import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const oauthPendingRef = useRef(false);

  useEffect(() => {
    // Detect OAuth redirect in URL and keep loading until auth event fires
    const hasOAuthParams =
      window.location.hash.includes("access_token") ||
      window.location.search.includes("code=") ||
      window.location.search.includes("access_token=");
    oauthPendingRef.current = hasOAuthParams;

    // 1) Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false); // resolve loading as soon as we get any auth event
      oauthPendingRef.current = false;
    });

    // 2) THEN check for existing session (prevents race conditions on OAuth redirect)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // If we detect OAuth params and no session yet, wait for onAuthStateChange
      if (!(oauthPendingRef.current && !session)) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
