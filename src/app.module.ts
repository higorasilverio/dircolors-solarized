import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), LeadsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
