import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Cambia esto si tu base está en otro host
      port: 7001,
      username: 'postgres', // Cambia por tu usuario de PostgreSQL
      password: '', // Cambia por tu contraseña de PostgreSQL
      database: 'gestion_tareas', // Cambia por el nombre de tu base de datos
      autoLoadEntities: true, // Carga automáticamente las entidades
      synchronize: true, // Solo para desarrollo: sincroniza el esquema automáticamente
    }),
  ],
})
export class AppModule {}
