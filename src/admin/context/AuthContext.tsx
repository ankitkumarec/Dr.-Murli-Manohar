import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// DEMO AUTH ONLY — REPLACE WITH PHP/MYSQL AUTH BEFORE PRODUCTION
// Do not use this in a real production environment.

export type Role = 'Super Admin' | 'Doctor' | 'Staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage (DEMO ONLY)
    const storedUser = localStorage.getItem('admin_session');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // DEMO AUTH ONLY — REPLACE WITH PHP/MYSQL AUTH BEFORE PRODUCTION
    if (email === 'admin@drmurli.com' && password === 'admin123') {
      const demoUser: User = {
        id: 'usr_01',
        name: 'Dr. Murli Manohar',
        email: 'admin@drmurli.com',
        role: 'Super Admin',
      };
      setCurrentUser(demoUser);
      localStorage.setItem('admin_session', JSON.stringify(demoUser));
      return true;
    }
    
    // Demo staff user
    if (email === 'staff@drmurli.com' && password === 'staff123') {
      const demoStaff: User = {
        id: 'usr_02',
        name: 'Clinic Staff',
        email: 'staff@drmurli.com',
        role: 'Staff',
      };
      setCurrentUser(demoStaff);
      localStorage.setItem('admin_session', JSON.stringify(demoStaff));
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('admin_session');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
