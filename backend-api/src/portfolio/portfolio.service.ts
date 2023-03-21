import {BadRequestException, Injectable} from '@nestjs/common';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import {PortfolioEntity} from "./entities/portfolio.entity";
import {ImagesService} from "../images/images.service";
import {CreatePortfolioDto} from "./dto/create-portfolio.dto";
import {CreateImageDto} from "../images/dto/create-image.dto";

@Injectable()
export class PortfolioService {
  constructor(
      private readonly imageService: ImagesService,

  ) {}
  async uploadImage(id: string, file: Express.Multer.File, createImageDto: CreateImageDto) {
    try {

      const portfolio = await PortfolioEntity.findOne({
        where: { id: id }
      });

      createImageDto.portfolio = portfolio;
      const image = await this.imageService.uploadImage(file, createImageDto);

      return image;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async create(createPortfolioDto: CreatePortfolioDto) {
    try {
      const { title, description, isVisible, website_url, customer } = createPortfolioDto;

      const portfolio = new PortfolioEntity();

      portfolio.title = title;
      portfolio.description = description;
      portfolio.is_visible = isVisible;
      portfolio.customer = customer;
      portfolio.website_url = website_url;

      return await portfolio.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    try {
      const portfolio = await PortfolioEntity.find({
      });
      console.log(portfolio);
      return portfolio;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string) {
    try {
      return await PortfolioEntity.find({
        where: { id: id}
      })
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findByTitle(title: string) {
    try {
      const portfolio = await PortfolioEntity.find({
        where: { title: title }
      });
      console.log(portfolio);

      return portfolio;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const { title, description, isVisible } = updatePortfolioDto;
      const portfolio = await PortfolioEntity.findOne({
        where: {id: id}
      });

      const portfolioTitle = portfolio.title;
      const portfolioDescription = portfolio.description;
      const portfolioIsVisible = portfolio.is_visible;

      typeof title !== 'undefined'? portfolio.title = title: portfolio.title = portfolioTitle;
      typeof description !== 'undefined'? portfolio.description = description: portfolio.description = portfolioDescription;
      typeof isVisible !== 'undefined'? portfolio.is_visible = isVisible: portfolio.is_visible = portfolioIsVisible;


      return await portfolio.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: string) {
    try {

      const portfolio = await PortfolioEntity.findOne({
        where: {id: id}
      });

      const deleteImage = await Promise.all(
          await this.imageService.remove(id)
      );
      const deletePortfolio = await portfolio.remove();

      return {
         deleteImage,
         deletePortfolio
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
