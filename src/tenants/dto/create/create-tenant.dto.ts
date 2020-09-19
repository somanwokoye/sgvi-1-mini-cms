import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { CreateCustomThemeDto } from "./create-custom-theme.dto"

export class CreateTenantDto extends CreateBaseAbstractDto{
    readonly code: string
    readonly name: string
    readonly contactFirstName: string
    readonly contactLastName: string
    readonly contactTitle: string
    readonly address: string
    readonly email: string
    readonly defaultURLSlug: string
    readonly dateOfRegistration: Date
    //readonly theme : CreateThemeDto
    readonly customTheme: CreateCustomThemeDto
    //readonly billings: CreateBillingDto[]
}