import {BadRequestException, Injectable} from '@nestjs/common';
import {ImageEntity} from "./entities/image.entity";
import {CreateImageDto} from "./dto/create-image.dto";
import {existsSync, unlinkSync} from "fs";

@Injectable()
export class ImagesService {

  async uploadImage(file: Express.Multer.File, createImageDto: CreateImageDto) {
    try {
      const { portfolio } = createImageDto;

      const image = new ImageEntity();

      image.portfolio = portfolio;
      image.file_name = file.filename;
      image.path = file.path;

      return await image.save();
    } catch (e) {
      throw new BadRequestException(e.message);
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

      return images.map( async (image: ImageEntity) => {
        const filePath = image.path;
        if (existsSync(filePath)) {
          await unlinkSync(filePath);
        }
        return await image.remove();
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
