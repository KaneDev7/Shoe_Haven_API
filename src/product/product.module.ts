import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 1000000,
      },
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = '../client/public/uploads'
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),

    }),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
