import {
  Controller,
  Param,
  Delete,
   Res, HttpStatus
} from '@nestjs/common';
import { ImagesService } from './images.service'

@Controller('image')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const portfolio = await this.imagesService.remove(id);
      return res.status(HttpStatus.OK).json(portfolio);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
