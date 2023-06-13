import {IsNotEmpty, IsOptional} from "class-validator";

export class UpdateCategoryDto {
    @IsOptional( { message: 'Category name is optional' })
    category_name: string;

    @IsOptional({ message: 'Description is optional' })
    description:string
}