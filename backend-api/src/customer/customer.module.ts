import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import {PortfolioService} from "../portfolio/portfolio.service";
import {ImagesService} from "../images/images.service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PortfolioService, ImagesService]
})
export class CustomerModule {}
