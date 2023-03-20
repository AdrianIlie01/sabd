import {IsNotEmpty} from "class-validator";
import {CustomerEntity} from "../../customer/entities/customer.entity";

export class CreatePortfolioDto {

    @IsNotEmpty({message: 'The title is required'})
    title: string;
    @IsNotEmpty({message: 'The description is required'})
    description: string;
    isVisible: boolean;
    customer: CustomerEntity;
    website_url: string;

}
