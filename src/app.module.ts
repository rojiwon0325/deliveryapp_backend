import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { UserModule } from '@user/user.module';
import { AuthModule, children } from '@auth/auth.module';
import { User } from '@user/user.entity';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env.dev',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        PORT: Joi.number().default(3000),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRESIN: Joi.string().required(),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),

        KAKAO_CLIENTID: Joi.string().required(),
        KAKAO_REDIRECT_URL: Joi.string().required(),

        NAVER_CLIENTID: Joi.string().required(),
        NAVER_SECRET: Joi.string().required(),
        NAVER_REDIRECT_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [User],
    }),
    AuthModule,
    JwtModule,
    UserModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children,
      },
    ]),
  ],
})
export class AppModule {}
