import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role: 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN';
}
