import {IsNotEmpty} from "class-validator";

export class UpdatePortfolioDto {

    @IsNotEmpty({message: 'The title is required'})
    title: string;
    @IsNotEmpty({message: 'The description is required'})
    description: string;
    isVisible: boolean;
}
