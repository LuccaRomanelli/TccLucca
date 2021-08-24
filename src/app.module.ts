import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { UserModule, UserEntity } from './user';
import { DataEntity, DataModule } from './data';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { PulseiraEntity, PulseiraModule } from './pulseira';
import { PacienteEntity, PacienteModule } from './paciente';
import { ConexaoEntity, ConexaoModule } from './conexao';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    DataModule,
    PulseiraModule,
    PacienteModule,
    ConexaoModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, DataEntity, PulseiraEntity, PacienteEntity, ConexaoEntity],
      synchronize: JSON.parse(process.env.DB_ENABLE_MIGRATION),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
