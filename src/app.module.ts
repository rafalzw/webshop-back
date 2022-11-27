import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
