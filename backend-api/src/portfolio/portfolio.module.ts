import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import {ImagesService} from "../images/images.service";
import {CustomerService} from "../customer/customer.service";

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, ImagesService, CustomerService]
})
export class PortfolioModule {}
