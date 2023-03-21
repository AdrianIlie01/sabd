import { IsOptional } from "class-validator";

export class UpdatePortfolioDto {

    @IsOptional( { message: 'Title is optional' })
    title: string;
    @IsOptional({ message: 'Description is optional' })
    description: string;
    isVisible: boolean;
}
