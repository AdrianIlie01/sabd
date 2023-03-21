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
      throw new BadRequestException(e.message);
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
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string) {
    try {
      return await CustomerEntity.find({
        where: { id: id }
      })
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findByName(name: string) {
    try {
      const customer = await CustomerEntity.find({
        where: { name: name }
      })
      console.log(typeof customer);
      console.log(customer);
      return customer;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const { name, email, websiteUrl } = updateCustomerDto;

      const customer = await CustomerEntity.findOne({
        where: {id: id}
      });

      const customerName = customer.name;
      const customerEmail = customer.email;
      const customerWebsite = customer.website_url;

      console.log(typeof email);

      typeof name !== 'undefined'? customer.name = name: customer.name = customerName;
      typeof email !== 'undefined'? customer.email = email: customer.email = customerEmail;
      typeof websiteUrl !== 'undefined'? customer.website_url = websiteUrl: customer.website_url = customerWebsite;

      return await customer.save();
    } catch (e) {
      throw new BadRequestException(e.message);
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
      throw new BadRequestException(e.message);
    }
  }
  async addWork(id: string, createPortfolioDto: CreatePortfolioDto) {
    try {

      const customer = await CustomerEntity.findOne({
        where: {id: id}
      });

      createPortfolioDto.customer = customer;
      createPortfolioDto.website_url = customer.website_url;
      const portfolio = await this.portfolioService.create(createPortfolioDto);

      return await portfolio;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
