import {IsEmail, IsNotEmpty, IsUrl} from "class-validator";

export class UpdateCustomerDto {

    @IsNotEmpty({message: 'The name is required'})
    name: string;

    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty({ message: 'The email is required' })
    email: string;

    @IsUrl({}, { message: 'Invalid URL' })
    websiteUrl: string;

}
