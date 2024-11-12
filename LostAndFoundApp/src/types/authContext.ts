import { UserAuth } from "./user";

export interface AuthContextType {
    user: UserAuth | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null; // Add error field to the context type
  }