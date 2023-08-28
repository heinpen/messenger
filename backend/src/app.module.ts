import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Set the database type to PostgreSQL
      host: 'localhost', // Replace with your PostgreSQL server host
      port: 5432, // Replace with your PostgreSQL server port
      username: 'postgres', // Replace with your PostgreSQL username
      password: 'postgres', // Replace with your PostgreSQL password
      database: 'messenger', // Replace with your PostgreSQL database name
      autoLoadEntities: true,
      synchronize: true, // Set to false in production (auto-generates the database schema)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
