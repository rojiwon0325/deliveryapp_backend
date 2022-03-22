import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { CommonModule } from '@common/common.module';
import { AuthModule, children } from '@auth/auth.module';
import { JwtModule } from '@jwt/jwt.module';
import { User } from '@user/user.entity';
import { UserModule } from '@user/user.module';
import { Restaurant } from '@restaurant/restaurant.entity';
import { RestaurantModule } from '@restaurant/restaurant.module';
import { MenuModule } from '@menu/menu.module';
import { Menu } from '@menu/entity/menu.entity';
import { MenuClass } from '@menu/entity/menu-class.entity';
import { MenuOption } from '@menu/entity/menu-option.entity';
import { MenuOptionSelection } from '@menu/entity/menu-option-selection.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';

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
      entities: [
        User,
        Restaurant,
        Menu,
        MenuClass,
        MenuOption,
        MenuOptionSelection,
        Category,
      ],
    }),
    AuthModule,
    JwtModule,
    CommonModule,
    UserModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children,
      },
    ]),
    RestaurantModule,
    MenuModule,
    CategoryModule,
  ],
})
export class AppModule {}
