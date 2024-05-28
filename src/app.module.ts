import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';

  
@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_HOST)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
