import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  },
);
