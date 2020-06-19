import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import upload from '@config/upload';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (upload.driver) {
      case 'disk':
        return this.avatar
          ? `${process.env.APP_API_URL}/files/${this.avatar}`
          : null;
      case 's3':
        return `https://${upload.config.aws.bucket}.s3.amazonws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}
