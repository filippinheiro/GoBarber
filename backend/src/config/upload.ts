import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  config: {
    multer: {
      storage: StorageEngine;
    };
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  config: {
    multer: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(_, file, callbalck) {
          const fileHash = crypto.randomBytes(10).toString('HEX');

          const fileName = `${fileHash}-${file.originalname}`;

          return callbalck(null, fileName);
        },
      }),
    },
    aws: {
      bucket: 'app-gobarber',
    },
  },
} as IUploadConfig;
