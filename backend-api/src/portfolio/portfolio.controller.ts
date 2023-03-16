import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpException,
  HttpStatus, UploadedFile, Res, Header
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {path} from "../shared/savedImagesPath";

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('/uploadImage/:id')
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: path,
          filename: (req, file , callback) => {

            const nameWithoutExtension: string = file.originalname
                .split('.')
                .slice(0, -1)
                .join('.');
            let fileName: string = `${nameWithoutExtension}`;

            const imageExtensionRegex = /\.(jpg|jpeg|png|gif)$/;
            // Check if the file has a valid image extension
            if (!imageExtensionRegex.test(file.originalname.toLowerCase())) {
              return callback(new HttpException('Only image files are allowed!',
                  HttpStatus.BAD_REQUEST), fileName);
            }

            // Check if the file name already exists in the folder
            const fs = require('fs');
            const files = fs.readdirSync(path);
            const matchingFiles = files.filter((f) => f.includes(fileName));
            if (matchingFiles.length > 0) {
              // Add an incrementing number to the filename
              const lastIndex: number = matchingFiles.length - 1;
              const lastMatchingFile: string = matchingFiles[lastIndex];
              const lastFileNumber: number = parseInt(
                  lastMatchingFile.replace(/.*_(\d+)\..*/, '$1'),
                  10,
              );
              if (isNaN(lastFileNumber)) {
                fileName = `${fileName}_1`;
              } else {
                const newFileNumber = lastFileNumber + 1;
                fileName = `${fileName}_${newFileNumber}`;
              }
            }

            // Add the file extension to the filename
            fileName += `.${file.originalname.split('.').pop()}`;
            file.filename = fileName;

            callback(null, fileName);
          },
        }),
      }),
  )
  @Header('Content-Type', 'multipart/form-data')
  async uploadImage(@Res() res, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    try {
      const upload = await this.portfolioService.uploadImage(file, id);
      // res.set({ 'Content-Type': 'multipart/form-data'});
      return res.status(HttpStatus.OK).json(upload);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const portfolio = await this.portfolioService.findAll();
      return res.status(HttpStatus.OK).json(portfolio);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const portfolio = await this.portfolioService.findOne(id);
      return res.status(HttpStatus.OK).json(portfolio);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const portfolio = await this.portfolioService.update(id, updatePortfolioDto);
      return res.status(HttpStatus.OK).json(portfolio);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string) {
    try {
      const portfolio = await this.portfolioService.remove(id);
      return res.status(HttpStatus.OK).json(portfolio);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
