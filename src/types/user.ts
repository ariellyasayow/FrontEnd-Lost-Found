// src/types/user.ts
export interface UserProfile {
  name: string;
  email: string;
  regis: string;
  whatsapp: string;
}

export interface User {
  id: string;
  email: string;
  isProfileComplete: boolean;
  profile: UserProfile;
}
