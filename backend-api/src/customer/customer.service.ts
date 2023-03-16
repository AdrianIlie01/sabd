import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {CustomerEntity} from "./entities/customer.entity";
import {PortfolioEntity} from "../portfolio/entities/portfolio.entity";
import {PortfolioService} from "../portfolio/portfolio.service";
import {CreatePortfolioDto} from "../portfolio/dto/create-portfolio.dto";

@Injectable()
export class CustomerService {
  constructor(
      private readonly portfolioService: PortfolioService
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const {name, email, websiteUrl} = createCustomerDto;
      const customer = new CustomerEntity();
      customer.name = name;
      customer.email = email;
      customer.website_url = websiteUrl;
      const savedCustomer = await customer.save();
      console.log(savedCustomer);
      return await savedCustomer;
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async findAll() {
    try {
      // const { page, perPage } = paginationInterface;
      // const skip: number = (page - 1) * perPage;
      const customer = await CustomerEntity.find({
        // skip: skip,
        // take: perPage,
      });
      console.log(customer);
      return customer;
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async findOne(id: string) {
    try {
      return await CustomerEntity.find({
        where: { id: id }
      })
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const { name, email, websiteUrl } = updateCustomerDto;
      const customer = await CustomerEntity.findOne({
        where: {id: id}
      })
      customer.name = name;
      customer.email = email;
      customer.website_url = websiteUrl;
      return await customer.save();
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async remove(id: string) {
    try {

      const portfolios = await PortfolioEntity.find({
        relations: {
          customer: true
        },
        where: { customer: { id: id } }
      })

      const deletedPortfolios = await Promise.all(
          portfolios.map(async (portfolio: PortfolioEntity) => {
          const deletePortfolio = await this.portfolioService.remove(portfolio.id);
          return {
            deletePortfolio
          }
        })
      );

      const customer = await CustomerEntity.findOne({
        where: { id: id }
      });
      const deletedCustomer = await customer.remove();

      return {
        deletedPortfolios,
        deletedCustomer
      }
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async addWork(id: string, createPortfolioDto: CreatePortfolioDto) {
    try {
      const { title, description, isVisible } = createPortfolioDto;

      const customer = await CustomerEntity.findOne({
        where: {id: id}
      });

      const portfolio = new PortfolioEntity();
      portfolio.title =title;
      portfolio.description = description;
      portfolio.is_visible = isVisible;
      portfolio.customer = customer;
      portfolio.website_url = customer.website_url;

      return  await portfolio.save();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
}
