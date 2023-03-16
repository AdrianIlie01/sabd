import {IsNotEmpty} from "class-validator";

export class CreatePortfolioDto {

    @IsNotEmpty({message: 'The title is required'})
    title: string;
    @IsNotEmpty({message: 'The description is required'})
    description: string;
    isVisible: boolean;

}
