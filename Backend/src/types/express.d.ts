import { Express } from 'express';

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      password: string;
      display_name: string;  // <-- Make sure this exists
      is_disabled: boolean;
    }
  }
}


// Enum type for provider
export type ProviderEnum = 'google' | 'github' | 'facebook' | 'other'; // Adjust based on your actual enum values

// User type definition
export interface IUser {
  id: string; // UUID
  username?: string; // Can be NULL if using provider-based auth
  password?: string; // Can be NULL if using provider-based auth
  display_name: string;
  is_disabled: boolean;
  provider?: ProviderEnum; // Can be NULL if using username/password
  provider_id?: string; // Can be NULL if using username/password
}