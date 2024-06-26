export interface Account {
  id?: number;
  email: string;
  hashedPassword: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
