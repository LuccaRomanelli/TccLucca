import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { UserModule, UserEntity } from './user';
import { DataEntity, DataModule } from './data';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

@Module({
  imports: [AuthModule, UserModule, DataModule, 
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, DataEntity],
      synchronize: JSON.parse(process.env.DB_ENABLE_MIGRATION),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
