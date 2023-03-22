import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {CreatePortfolioDto} from "../portfolio/dto/create-portfolio.dto";

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Res() res, @Body() createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.customerService.create(createCustomerDto);
      return res.status(HttpStatus.CREATED).json(customer);
    } catch (e) {
      console.log('controller');
      console.log(e);
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const customer = await this.customerService.findAll();
      return res.status(HttpStatus.CREATED).json(customer);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const customer = await this.customerService.findOne(id);
      return res.status(HttpStatus.OK).json(customer);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    try {
      console.log(typeof updateCustomerDto.email);
      console.log(updateCustomerDto.email);
      const customer = await this.customerService.update(id, updateCustomerDto);
      return res.status(HttpStatus.OK).json(customer);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const customer = await this.customerService.remove(id);
      console.log('controller');
      console.log(customer);
      return res.status(HttpStatus.OK).json(customer);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Post('/addWork/:id')
  async addWork(@Res() res, @Param('id') id: string, @Body() createPortfolioDto: CreatePortfolioDto) {
    try {
      const customer = await this.customerService.addWork(id, createPortfolioDto);
      return res.status(HttpStatus.OK).json(customer);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Get('name/:name')
  async findByName(@Res() res, @Param('name') name: string) {
    try {
      const customer = await this.customerService.findByName(name);
      return res.status(HttpStatus.OK).json(customer);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
