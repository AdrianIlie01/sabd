import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ImagesModule } from './images/images.module';
import { CustomerModule } from './customer/customer.module';
import {CustomerEntity} from "./customer/entities/customer.entity";
import {PortfolioEntity} from "./portfolio/entities/portfolio.entity";
import {ImageEntity} from "./images/entities/image.entity";
import {ValidateProfileMiddleware} from "./portfolio/middleware/validate-profile-middleware";
import { CategoryModule } from './category/category.module';
import { CategoryLinksModule } from './category-links/category-links.module';
import {CategoryEntity} from "./category/entities/category.entity";
import {CategoryLinkEntity} from "./category-links/entities/category-link.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'project',
      password: 'project',
      database: 'project',
      entities: [CustomerEntity, PortfolioEntity, ImageEntity, CategoryEntity, CategoryLinkEntity],
      synchronize: true,
    }),
    PortfolioModule,
    ImagesModule,
    CustomerModule,
    CategoryModule,
    CategoryLinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(ValidateProfileMiddleware)
        .forRoutes('portfolio/uploadImage/:id');
  }
}
