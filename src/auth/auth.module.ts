import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/interfaces/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { StripeService } from '../stripe/stripe.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, StripeService],
  exports: [JwtStrategy],
})
export class AuthModule {}
