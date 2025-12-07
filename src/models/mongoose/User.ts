import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, UserStatus } from '../../mock/types';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  lastLogin: Date;
  kycCompleted: boolean;
  avatar?: string;
  passwordHash: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    status: { type: String, enum: ['active', 'frozen', 'closed'], default: 'active' },
    createdAt: { type: Date, default: () => new Date() },
    lastLogin: { type: Date, default: () => new Date() },
    kycCompleted: { type: Boolean, default: false },
    avatar: { type: String },
    passwordHash: { type: String, required: true }
  },
  { timestamps: false }
);

userSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.passwordHash;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export const UserModel = mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema);
