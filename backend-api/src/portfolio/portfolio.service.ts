import {BadRequestException, Injectable} from '@nestjs/common';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import {PortfolioEntity} from "./entities/portfolio.entity";
import {ImagesService} from "../images/images.service";

@Injectable()
export class PortfolioService {
  constructor(
      private readonly imageService: ImagesService,

  ) {}
  async uploadImage(file: Express.Multer.File, id: string) {
    try {
      const portfolio = await PortfolioEntity.findOne({
        where: { id: id }
      });

      return await this.imageService.uploadImage(file, portfolio.id);
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async findAll() {
    try {
      const portfolio = await PortfolioEntity.find({
      });
      console.log(portfolio);
      return portfolio;
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async findOne(id: string) {
    try {
      return await PortfolioEntity.find({
        where: { id: id}
      })
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const { title, description, isVisible } = updatePortfolioDto;
      const portfolio = await PortfolioEntity.findOne({
        where: {id: id}
      });
      portfolio.title = title;
      portfolio.description = description;
      portfolio.is_visible = isVisible;
      return await portfolio.save();
    } catch (e) {
      return new BadRequestException(e);
    }
  }

  async remove(id: string) {
    try {

      const portfolio = await PortfolioEntity.findOne({
        where: {id: id}
      });

      const deleteImage = await this.imageService.remove(id);
      const deletePortfolio = await portfolio.remove();

      return {
         deleteImage,
         deletePortfolio
      };
    } catch (e) {
      return new BadRequestException(e.detail);
    }
  }
}
