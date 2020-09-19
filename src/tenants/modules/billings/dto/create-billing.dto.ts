import { CreateBaseAbstractDto } from "src/global/create-base-abstract.dto"
export class CreateBillingDto extends CreateBaseAbstractDto{
    readonly code: string
    readonly description: string
    readonly type: string
    //readonly tenant: CreateTenantDto
}