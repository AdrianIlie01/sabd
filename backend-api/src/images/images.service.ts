import {BadRequestException, Injectable} from '@nestjs/common';
import {ImageEntity} from "./entities/image.entity";
import {PortfolioEntity} from "../portfolio/entities/portfolio.entity";
import {path} from "../shared/savedImagesPath";

@Injectable()
export class ImagesService {

  async uploadImage(file: Express.Multer.File, id: string) {
    try {
      const portfolio = await PortfolioEntity.findOne({
        where: {id: id}
      });

      const image = new ImageEntity();
      image.portfolio = portfolio;
      image.file_name = file.filename;
      image.path = path;
      return await image.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }


  async remove(id: string) {
    try {

      const images = await ImageEntity.find({
        relations: {
          portfolio: true
        },
        where: { portfolio : { id: id } }
      });

      const deletedImages = images.map( async (image: ImageEntity) => {
        return await image.remove();
      });

      return deletedImages;
    } catch (e) {
      return new BadRequestException(e);
    }
  }
}
