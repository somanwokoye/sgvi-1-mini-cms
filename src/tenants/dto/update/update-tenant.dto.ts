import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
import { CreateBillingDto } from "../../modules/billings/dto/create-billing.dto"
import { UpdateCustomThemeDto } from "./update-custom-theme.dto"

export class UpdateTenantDto extends CreateBaseAbstractDto{
    readonly id: number
    readonly code: string
    readonly name: string
    readonly contactFirstName: string
    readonly contactLastName: string
    readonly contactTitle: string
    readonly address: string
    readonly email: string
    readonly defaultURLSlug: string
    //readonly customURLSlug: string
    readonly dateOfRegistration: Date
    //readonly active: boolean
    //readonly theme : CreateThemeDto
    readonly customTheme: UpdateCustomThemeDto
    //readonly billings: CreateBillingDto[]
}