import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { CreateCustomThemeDto } from "./create-custom-theme.dto"

export class CreateTenantDto extends CreateBaseAbstractDto{

    @IsNotEmpty()
    readonly code: string
    @IsNotEmpty()
    readonly name: string
    @IsNotEmpty()
    readonly contactFirstName: string
    @IsNotEmpty()
    readonly contactLastName: string
    @IsNotEmpty()
    readonly contactTitle: string
    @IsNotEmpty()
    readonly address: string
    @IsEmail()
    @IsNotEmpty()
    readonly email: string
    @IsNotEmpty()
    readonly defaultURLSlug: string
    @IsNotEmpty()
    readonly dateOfRegistration: Date
    //readonly theme : CreateThemeDto
    readonly customTheme: CreateCustomThemeDto
    //readonly billings: CreateBillingDto[]
}