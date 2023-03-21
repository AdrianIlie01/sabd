import {IsEmail, IsOptional, IsUrl} from "class-validator";

export class UpdateCustomerDto {

    @IsOptional( { message: 'Name is optional' })
    name: string;

    @IsOptional({ message: 'Email is optional' })
    @IsEmail({}, {message: 'Invalid email update'})
    email: string;

    @IsUrl({}, { message: 'Invalid URL' })
    @IsOptional({ message: 'WebsiteUrl is optional' })
    websiteUrl: string;

}
