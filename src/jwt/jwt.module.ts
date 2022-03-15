import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as OriginalModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    OriginalModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRESIN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy],
  exports: [OriginalModule],
})
export class JwtModule {}
