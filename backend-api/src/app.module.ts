import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ImagesModule } from './images/images.module';
import { CustomerModule } from './customer/customer.module';
import {CustomerEntity} from "./customer/entities/customer.entity";
import {PortfolioEntity} from "./portfolio/entities/portfolio.entity";
import {ImageEntity} from "./images/entities/image.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'project',
      password: 'project',
      database: 'project',
      entities: [CustomerEntity, PortfolioEntity, ImageEntity],
      synchronize: true,
    }),
    PortfolioModule,
    ImagesModule,
    CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
